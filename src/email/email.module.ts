import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        // transport: `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_PASSWORD}@${process.env.EMAIL_HOST}`,
        transport: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          // ignoreTLS: true,
        },
        defaults: {
          from: `"${process.env.EMAIL_USER}" <no-reply@${process.env.EMAIL_DOMAIN}>`,
        },
        // template: {
        //   dir: __dirname + "/templates",
        //   adapter: new HandlebarsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
