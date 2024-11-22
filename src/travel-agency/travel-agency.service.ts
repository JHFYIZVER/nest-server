import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { TravelAgencyDto } from "./dto/travel-agency.dto";

@Injectable()
export class TravelAgencyService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTravelAgency(): Promise<any[]> {
    const travelAgency = await this.prisma.travelAgency.findMany();
    return travelAgency;
  }

  async createTravelAgency(travelAgencyDto: TravelAgencyDto): Promise<any> {
    try {
      const name = travelAgencyDto.name;
      const travelAgency = await this.prisma.travelAgency.create({
        data: {
          name: name,
        },
      });
      return { travelAgency: travelAgency };
    } catch (error) {
      throw new Error(error);
    }
  }

  async deliteTravelAgency(id: number): Promise<any> {
    try {
      const travelAgencyId = parseInt(id.toString(), 10);
      const travelAgency = await this.prisma.travelAgency.delete({
        where: { id: travelAgencyId },
      });
      return travelAgency;
    } catch (error) {
      throw new Error(error);
    }
  }
}
