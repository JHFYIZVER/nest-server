import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { DataDto } from "./dto/data.dto";

@Injectable()
export class DataService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllData(): Promise<any[]> {
    const data = await this.prismaService.data.findMany();
    return data;
  }

  async createData(dataDto: DataDto): Promise<any> {
    try {
      const { departureDate, returnDate, flightTime, tourId } = dataDto;

      const existingTour = await this.prismaService.tour.findUnique({
        where: { id: parseInt(tourId.toString(), 10) },
      });

      if (!existingTour) {
        throw new Error("Tour not found");
      }
      const departureDateNew = new Date(departureDate);
      const returnDateNew = new Date(returnDate);

      const existingData = await this.prismaService.data.findUnique({
        where: {
          tourId: parseInt(tourId.toString(), 10),
          departureDate: departureDateNew,
          returnDate: returnDateNew,
        },
      });

      if (existingData) {
        throw new Error("Data already exists");
      }

      const data = await this.prismaService.data.create({
        data: {
          departureDate: departureDateNew,
          returnDate: returnDateNew,
          flightTime: flightTime,
          tourId: parseInt(tourId.toString(), 10),
        },
      });

      return { data: data };
    } catch (error) {
      throw new Error(error);
    }
  }
}
