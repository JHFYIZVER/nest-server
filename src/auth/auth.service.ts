import { UsersService } from "./../users/users.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException("User does not exist");
    }

    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      throw new NotFoundException("Password is incorrect");
    }

    return { token: this.jwtService.sign({ email }) };
  }

  async registration(registrationDto: RegisterDto): Promise<any> {
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

    return { token: this.jwtService.sign({ email: user.email }) };
  }
}
