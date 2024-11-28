import { UsersService } from "./../users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";
import { Response } from "express";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(loginDto: LoginDto, res: Response): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    const { password: _, phone: __, ...userInfo } = user;

    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      throw new NotFoundException("Password is incorrect");
    }

    const token = this.jwtService.sign({ email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    return { message: token, user: userInfo };
  }

  async registration(
    registrationDto: RegisterDto,
    res: Response
  ): Promise<any> {
    const createUser = new Users();
    createUser.name = registrationDto.name;
    createUser.surname = registrationDto.surname;
    createUser.email = registrationDto.email;
    createUser.phone = registrationDto.phone;
    createUser.password = await bcrypt.hash(registrationDto.password, 10);
    createUser.role = "USER";

    const user = await this.usersService.registration(createUser);

    const { id } = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    const userOrder = await this.prisma.order.create({
      data: { userId: id },
    });

    await Promise.all([userOrder]);

    const token = this.jwtService.sign({ email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    return { message: "Registration successful" };
  }

  async check(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }
}
