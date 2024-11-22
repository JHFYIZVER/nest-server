import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { DataService } from "./data.service";
import { DataGuard } from "./conception/data.guard";
import { DataDto } from "./dto/data.dto";
import { Response } from "express";

@Controller("data")
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  @UseGuards(DataGuard)
  async getAllData(): Promise<any> {
    return this.dataService.getAllData();
  }

  @Post()
  @UseGuards(DataGuard)
  async createData(
    @Body() dataDto: DataDto,
    @Res() response: Response
  ): Promise<any> {
    try {
      const result = await this.dataService.createData(dataDto);
      return response.status(200).json({
        status: "success",
        message: "Data created successfully",
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
