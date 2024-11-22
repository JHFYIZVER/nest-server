import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { TravelAgencyService } from "./travel-agency.service";
import { TravelAgencyDto } from "./dto/travel-agency.dto";
import { TravelAgencyGuard } from "./conception/travel-agency.guard";

@Controller("travel-agency")
export class TravelAgencyController {
  constructor(private readonly travelAgencyService: TravelAgencyService) {}

  @Get()
  getAllTravelAgency(): Promise<any[]> {
    try {
      const travelAgency = this.travelAgencyService.getAllTravelAgency();
      return travelAgency;
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @UseGuards(TravelAgencyGuard)
  async createTravelAgency(
    @Body() travelAgencyDto: TravelAgencyDto,
    @Res() response: Response
  ): Promise<any> {
    try {
      const travelAgency =
        await this.travelAgencyService.createTravelAgency(travelAgencyDto);
      return response.status(200).json({
        status: "success",
        message: "TravelAgency created successfully",
        result: travelAgency,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  @Delete(":id")
  @UseGuards(TravelAgencyGuard)
  async deliteTravelAgency(@Res() response: Response, @Param("id") id: number) {
    try {
      const travelAgency = await this.travelAgencyService.deliteTravelAgency(id);
      return response.status(200).json({
        status: "success",
        message: "TravelAgency deleted successfully",
        result: travelAgency,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : error,
      });
    }
  }
}
