import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AirlinesService } from "./airlines.service";
import { AirlinesGuard } from "./conception/airlines.guard";
import { AirlinesDto } from "./dto/airlines.dto";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
@Controller("airlines")
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}

  @Get()
  async getAllAirlines(): Promise<any> {
    const airlines = await this.airlinesService.getAllAirlines();
    return airlines;
  }

  @Post()
  @UseGuards(AirlinesGuard)
  @UseInterceptors(FileInterceptor("logo"))
  async createAirlines(
    @Body() airlinesDto: AirlinesDto,
    @UploadedFile() logo: Express.Multer.File,
    @Res() response: Response
  ): Promise<any> {
    try {
      const result = await this.airlinesService.createAirlines(
        airlinesDto,
        logo
      );
      return response.status(200).json({
        status: "success",
        message: "Airlines created successfully",
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  @Delete("/:id")
  @UseGuards(AirlinesGuard)
  async deliteAirlines(@Res() response: Response, @Param("id") id: number) {
    try {
      const result = await this.airlinesService.deliteAirlines(id);
      return response.status(200).json({
        status: "success",
        message: "Airlines deleted successfully",
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
