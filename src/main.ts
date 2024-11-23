import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  const cors = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  app.enableCors(cors);
  app.setGlobalPrefix(globalPrefix);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
