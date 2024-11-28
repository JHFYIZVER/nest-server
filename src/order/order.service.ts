import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { OrderDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllOrders(orderId: number): Promise<any> {
    const orders = await this.prisma.orderTour.findMany({
      where: {
        orderId: parseInt(orderId.toString(), 10),
      },
    });
    const tourInfo = await this.prisma.tour.findMany({
      where: {
        id: {
          in: orders.map((order) => order.tourId),
        },
      },
      select: {
        id: true,
        title: true,
        airlinesId: true,
      },
    });
    const airlinesInfo = await this.prisma.airlines.findMany({
      where: {
        id: {
          in: tourInfo.map((order) => order.airlinesId),
        },
      },
    });
    return {
      orders: orders,
      tourInfo: tourInfo,
      airlinesInfo: airlinesInfo,
    };
  }

  async addTourInOrder(orderDto: OrderDto): Promise<any> {
    try {
      const { tourId, orderId } = orderDto;

      const isAdded = await this.prisma.orderTour.findUnique({
        where: {
          tourId: parseInt(tourId.toString(), 10),
          orderId: parseInt(orderId.toString(), 10),
        },
      });

      if (isAdded) {
        throw new Error("Tour already added to order");
      }

      const isExistTour = await this.prisma.tour.findUnique({
        where: { id: parseInt(tourId.toString(), 10) },
      });

      if (!isExistTour) {
        throw new Error("Tour not found");
      }

      const order = await this.prisma.orderTour.create({
        data: {
          tourId: parseInt(tourId.toString(), 10),
          orderId: parseInt(orderId.toString(), 10),
        },
      });

      return { orderTour: order };
    } catch (error) {
      throw new Error(error);
    }
  }
}
