import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocs from "./swagger/swagger.json";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );

  app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  await app.listen(3001);
}
bootstrap();
