import { ValidationPipe } from "@nestjs/common";
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { readFileSync } from "fs";
import "reflect-metadata";
import { AppModule } from "./app.module";

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    key: readFileSync("./private.key"),
    cert: readFileSync("./certificate.crt"),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  const origin = [
    "https://main.d3unqwilcm1tv7.amplifyapp.com",
    "https://develop.d3unqwilcm1tv7.amplifyapp.com",
    "https://emprega-regional-client.vercel.app",
    "http://localhost:3000",
    "https://localhost:3001",
  ];
  console.log({ origin });
  app.enableCors({
    origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "x-access-token",
    ],
  });
  app.use(cookieParser());

  await app.listen(process.env.API_PORT || 3001);
}
bootstrap();
