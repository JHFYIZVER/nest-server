import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { OrderStrategy } from "./order.strategy";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderStrategy, PrismaService],
})
export class OrderModule {}
