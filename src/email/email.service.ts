import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, confirmationToken: string) {
    const clientUrl = process.env.CLIENT_URL;
    const value = await this.mailerService.sendMail({
      to: email,
      subject: "Confirmação do email na 99Emprega",
      from: process.env.EMAIL_USER,
      html: `<h1>Confirmação do email na 99Emprega click aqui <a href="${clientUrl}/confirm-email?token=${confirmationToken}">Confirmar</a></h1>`,
      // text: "Confirmação do email na 99Emprega",
      // template: "./confirmation",
      // context: {
      //   confirmationUrl: `${clientUrl}/confirm-email?token=${confirmationToken}`,
      // },
    });
    return value;
  }
}
