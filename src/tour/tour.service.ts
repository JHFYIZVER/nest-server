import { TourDto } from "./dto/tour.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import * as path from "path";

interface Params {
  airlinesId?: number;
  travelAgencyId?: number;
  limit: number;
  page: number;
}

@Injectable()
export class TourService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTours(params: Params): Promise<any> {
    try {
      let { airlinesId, travelAgencyId, limit = 4, page = 1 }: Params = params;
      limit = parseInt(limit.toString(), 10);
      let offset = (page - 1) * limit;

      if (airlinesId) {
        airlinesId = parseInt(airlinesId.toString(), 10);
      }

      if (travelAgencyId) {
        travelAgencyId = parseInt(travelAgencyId.toString(), 10);
      }

      const tours = await this.prisma.tour.findMany({
        where: {
          airlinesId: airlinesId || undefined,
          travelAgencyId: travelAgencyId || undefined,
        },
        take: limit,
        skip: offset,
        orderBy: {
          id: 'asc', 
        },
      });

      return { tour: tours };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTourById(id: number): Promise<any> {
    try {
      const tourId = parseInt(id.toString(), 10);
      const tour = await this.prisma.tour.findUnique({
        where: { id: tourId },
      });

      const pictures = await this.prisma.pictures.findMany({
        where: { tourId: tourId },
      });

      const includes = await this.prisma.includes.findMany({
        where: { tourId: tourId },
      });

      const notIncludes = await this.prisma.notIncludes.findMany({
        where: { tourId: tourId },
      });

      return {
        tour: tour,
        pictures: pictures,
        includes: includes,
        notIncludes: notIncludes,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTour(tourDto: TourDto): Promise<any> {
    try {
      const {
        title,
        location,
        travelAgencyId,
        airlinesId,
        description,
        price,
        pictures,
        includes,
        notIncludes,
      } = tourDto;

      const airlinesIdInt = parseInt(airlinesId.toString(), 10);
      const travelAgencyIdInt = parseInt(travelAgencyId.toString(), 10);
      const priceInt = parseInt(price.toString(), 10);

      if (!pictures || pictures.length === 0) {
        throw new Error("At least one picture is required");
      }

      const uploadPath = path.resolve(__dirname, "..", "..", "static");

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const pictureUrls: string[] = [];

      for (const picture of pictures) {
        const pictureName = uuidv4() + path.extname(picture.originalname);
        const picturePath = path.join(uploadPath, pictureName);
        fs.writeFileSync(picturePath, picture.buffer);
        pictureUrls.push(pictureName);
      }

      const includesData = includes.map((include) => ({ include }));

      const notIncludesData = notIncludes.map((notInclude) => ({ notInclude }));

      const tour = await this.prisma.tour.create({
        data: {
          title,
          location,
          travelAgencyId: travelAgencyIdInt,
          airlinesId: airlinesIdInt,
          description,
          price: priceInt,
        },
      });

      const includesPromises = includesData.map((include) => {
        return this.prisma.includes.create({
          data: {
            description: include.include,
            tourId: tour.id,
          },
        });
      });

      const notIncludesPromises = notIncludesData.map((notInclude) => {
        return this.prisma.notIncludes.create({
          data: {
            description: notInclude.notInclude,
            tourId: tour.id,
          },
        });
      });

      const picturePromises = pictureUrls.map((url) => {
        return this.prisma.pictures.create({
          data: {
            url,
            tourId: tour.id,
          },
        });
      });

      await Promise.all([
        picturePromises,
        includesPromises,
        notIncludesPromises,
      ]);

      return { tour: tour };
    } catch (error) {
      throw new Error(error);
    }
  }
}
