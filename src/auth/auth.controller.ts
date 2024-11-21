import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterDto } from "./dto/register-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  async login(
    @Req() request: Request,
    @Res() response: Response,
    @Body() loginDto: LoginDto
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDto);
      return response.status(200).json({
        status: "success",
        message: "User logged in successfully",
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  @Post("/registration")
  async registration(
    @Req() request: Request,
    @Res() response: Response,
    @Body() registerDto: RegisterDto
  ): Promise<any> {
    try {
      const result = await this.authService.registration(registerDto);
      return response.status(200).json({
        status: "success",
        message: "User registered successfully",
        result: result,
      });
    } catch (error) {
      return response.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}
