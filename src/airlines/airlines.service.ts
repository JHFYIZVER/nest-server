import { AirlinesDto } from "./dto/airlines.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";
@Injectable()
export class AirlinesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAirlines(): Promise<any[]> {
    const airlines = await this.prisma.airlines.findMany();
    return airlines;
  }

  async createAirlines(
    airlinesDto: AirlinesDto,
    logo: Express.Multer.File
  ): Promise<any> {
    const { name, plane } = airlinesDto;
    if (!logo) {
      throw new Error("Logo file is required");
    }
    let logoName = uuidv4() + ".png";
    const uploadPath = path.resolve(
      __dirname,
      "..",
      "..",
      "src",
      "airlines",
      "logo"
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    fs.writeFileSync(path.join(uploadPath, logoName), logo.buffer);

    const existingAirlines = await this.prisma.airlines.findUnique({
      where: { name: name },
    });

    if (existingAirlines) {
      throw new Error("Airline with this name already exists");
    }

    const airlines = await this.prisma.airlines.create({
      data: {
        name,
        plane,
        logo: logoName,
      },
    });

    return { airlines: airlines };
  }

  async deliteAirlines(id: number): Promise<any> {
    try {
      const airlinesId = parseInt(id.toString(), 10);
      const airline = await this.prisma.airlines.findUnique({
        where: { id: airlinesId },
      });

      if (!airline) {
        throw new Error(`Airline with ID ${id} not found`);
      }

      const filePath = path.resolve(
        __dirname,
        "..",
        "..",
        "static",
        airline.logo
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      const airlines = await this.prisma.airlines.delete({
        where: { id: airlinesId },
      });
      return airlines;
    } catch (error) {
      throw new Error(error);
    }
  }
}
