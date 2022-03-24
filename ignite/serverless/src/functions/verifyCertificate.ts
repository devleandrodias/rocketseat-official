import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamoDbClient";

interface IUserCertificate {
  id: string;
  name: string;
  grade: string;
  createdAt: string;
}

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  const { id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_certificate",
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": id },
    })
    .promise();

  const userCertificate = response.Items[0] as IUserCertificate;

  if (userCertificate) {
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Certificado válido",
        name: userCertificate.name,
        url: `https://devleandrocertificateignite.s3.us-east-1.amazonaws.com/${id}.pdf`,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Certificado inválido!",
    }),
  };
};
