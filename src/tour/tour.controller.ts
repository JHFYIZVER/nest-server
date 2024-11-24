import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Response } from "express";
import { TourService } from "./tour.service";
import { TourGuard } from "./conception/tour.guard";
import { TourDto } from "./dto/tour.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("tour")
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Get()
  async getAllTours(@Query() params: any): Promise<any> {
    const tours = await this.tourService.getAllTours(params);
    return tours;
  }

  @Get("/:id")
  async getTourById(
    @Res() response: Response,
    @Param("id") id: number
  ): Promise<any> {
    try {
      const tour = await this.tourService.getTourById(id);
      return response.status(200).json({
        status: "success",
        message: "Tour found successfully",
        result: tour,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  @Post()
  @UseGuards(TourGuard)
  @UseInterceptors(FilesInterceptor("pictures"))
  async createTour(
    @Res() response: Response,
    @Body() tourDto: TourDto,
    @UploadedFiles() pictures: Express.Multer.File[]
  ): Promise<any> {
    try {
      const result = await this.tourService.createTour({
        ...tourDto,
        pictures,
      });
      return response.status(200).json({
        status: "success",
        message: "Tour created successfully",
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
