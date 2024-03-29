import fs from "node:fs";
import handlebars from "handlebars";
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf8");
    const templateParse = handlebars.compile(templateFileContent);
    const html = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      html,
      subject,
      from: "RentX <noreplay@@rentx.com.br>",
    });

    console.log("Message send: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
