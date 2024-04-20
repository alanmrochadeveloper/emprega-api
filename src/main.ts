import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import "reflect-metadata";
import { AppModule } from "./app.module";

async function bootstrap() {
  console.log(process.env.API_PORT);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.enableCors({ origin: "*", allowedHeaders: "*", credentials: true });
  app.use(cookieParser());
  await app.listen(process.env.API_PORT || 3001);
}
bootstrap();
