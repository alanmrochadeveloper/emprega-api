import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, confirmationToken: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: "Email Confirmation",
      template: "./confirmation",
      context: {
        confirmationUrl: `http://your-frontend-url/confirm-email?token=${confirmationToken}`,
      },
    });
  }
}
