import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, confirmationToken: string) {
    const clientUrl = process.env.CLIENT_URL;
    await this.mailerService.sendMail({
      to: email,
      subject: "Confirmação do email na 99Emprega",
      template: "./confirmation",
      context: {
        confirmationUrl: `${clientUrl}/confirm-email?token=${confirmationToken}`,
      },
    });
  }
}
