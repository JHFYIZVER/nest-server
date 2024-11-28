import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.usersService.getAllUsers();
      return {
        status: "success",
        message: "Users fetched successfully",
        result: users,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: "error",
          message: error.message || "An unexpected error occurred",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('by-token') 
  async getUserByToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const token = req.headers['authorization']; 
      const user = await this.usersService.getUserByToken(token);

      return res.status(200).json({
        status: 'success',
        message: 'User found successfully',
        result: {
          ...user,
          password: undefined,
          phone: user.phone.toString(),
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}