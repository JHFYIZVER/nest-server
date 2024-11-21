import { Controller, Get, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Request, Response } from "express";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response
  ): Promise<any> {
    
    try{
      const users = await this.usersService.getAllUsers();
      return response.status(200).json({
        status: "success",
        message: "Users fetched successfully",
        result: users
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error
      });
    }
  }
}
