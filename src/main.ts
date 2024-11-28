import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  const cors = {
    origin: ['http://localhost:3000'],
    credentials: true,  
    allowedHeaders: "Content-Type, Authorization",  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  };
  app.enableCors(cors);
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
