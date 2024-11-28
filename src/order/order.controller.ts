import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderStrategy } from "./order.strategy";
import { OrderDto } from "./dto/order.dto";
import { Response } from "express";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("/:orderId")
  @UseGuards(OrderStrategy)
  async getAllOrders(@Param("orderId") orderId: number): Promise<any[]> {
    return this.orderService.getAllOrders(orderId);
  }

  @Post("/add")
  @UseGuards(OrderStrategy)
  async addTourInOrder(
    @Body() orderDto: OrderDto,
    @Res() response: Response
  ): Promise<any> {
    try {
      const result = await this.orderService.addTourInOrder(orderDto);
      return response.status(200).json({
        status: "success",
        message: "Tour added to order successfully",
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}
