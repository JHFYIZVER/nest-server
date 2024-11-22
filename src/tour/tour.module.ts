import { Module } from "@nestjs/common";
import { TourService } from "./tour.service";
import { TourController } from "./tour.controller";
import { PrismaService } from "src/prisma.service";
import { TourStrategy } from "./tour.strategy";

@Module({
  controllers: [TourController],
  providers: [TourService, PrismaService, TourStrategy],
})
export class TourModule {}
