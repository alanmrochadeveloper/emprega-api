import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import "reflect-metadata";
import { AppModule } from "./app.module";

async function bootstrap() {
  // const httpsOptions: HttpsOptions = {
  //   key: readFileSync("../private.key"),
  //   cert: readFileSync("../certificate.crt"),
  // };
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  app.enableCors({
    origin: "*",
    allowedHeaders: "*",
    credentials: true,
    methods: "*",
  });
  app.use(cookieParser());
  await app.listen(process.env.API_PORT || 3001);
}
bootstrap();
