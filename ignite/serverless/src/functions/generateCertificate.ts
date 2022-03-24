import dayjs from "dayjs";
import hbs from "handlebars";
import chromium from "chrome-aws-lambda";

import { join } from "path";
import { S3 } from "aws-sdk";
import { readFileSync } from "fs";
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/dynamoDbClient";

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

interface ICertificateTemplate {
  id: string;
  name: string;
  grade: string;
  date: string;
  medal: string;
}

const compileTemplate = async (data: ICertificateTemplate) => {
  const filePath = join(process.cwd(), "src", "templates", "certificate.hbs");
  const html = readFileSync(filePath, "utf-8");
  return hbs.compile(html)(data);
};

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": id },
    })
    .promise();

  const userAlreadyExists = response.Items[0];

  if (!userAlreadyExists) {
    await document
      .put({
        TableName: "users_certificate",
        Item: { id, name, grade, createdAt: new Date().toISOString() },
      })
      .promise();
  }

  const medalPath = join(process.cwd(), "src", "templates", "selo.png");

  const medal = readFileSync(medalPath, "base64");

  const template: ICertificateTemplate = {
    id,
    name,
    grade,
    medal,
    date: dayjs().format("DD/MM/YYYY"),
  };

  const content = await compileTemplate(template);

  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    headless: true,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
  });

  const page = await browser.newPage();

  await page.setContent(content);

  const pdf = await page.pdf({
    format: "a4",
    landscape: true,
    printBackground: true,
    preferCSSPageSize: true,
    path: process.env.IS_OFFLINE ? `./certificate.pdf` : null,
  });

  const s3 = new S3();

  await s3
    .putObject({
      Bucket: "devleandrocertificateignite",
      Key: `${id}.pdf`,
      Body: pdf,
      ContentType: "application/pdf",
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Certificado gerado com sucesso!",
      url: `https://devleandrocertificateignite.s3.us-east-1.amazonaws.com/${id}.pdf`,
    }),
  };
};
