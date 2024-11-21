import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
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
}
