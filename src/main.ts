import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
