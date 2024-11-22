import { Module } from "@nestjs/common";
import { DataService } from "./data.service";
import { DataController } from "./data.controller";
import { PrismaService } from "src/prisma.service";
import { DataStrategy } from "./data.strategy";

@Module({
  controllers: [DataController],
  providers: [DataService, DataStrategy, PrismaService],
})
export class DataModule {}
