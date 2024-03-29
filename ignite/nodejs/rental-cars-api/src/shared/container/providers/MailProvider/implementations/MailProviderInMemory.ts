import { IMailProvider } from "../IMailProvider";

export class MailProviderInMemory implements IMailProvider {
  private messages: any = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.messages.push({
      to,
      path,
      subject,
      variables,
    });
  }
}
