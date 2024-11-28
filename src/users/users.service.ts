import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Users } from "./users.model";
import { PrismaService } from "src/prisma.service";
import * as jwt from "jsonwebtoken";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<any[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users.map((user) => ({
        ...user,
        phone: user.phone.toString(),
        password: undefined,
      }));
    } catch (error) {
      throw new InternalServerErrorException("Failed to fetch users");
    }
  }

  async getUserByToken(token: string): Promise<Users | null> {
    try {
      const tokenParts = token.split(" ");
      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new UnauthorizedException("Invalid token format");
      }
      const extractedToken = tokenParts[1];
      const decoded: any = jwt.verify(extractedToken, process.env.JWT_SECRET);
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email },
      });
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedException("Invalid token");
      }
      console.error("Ошибка валидации токена:", error);
      throw new InternalServerErrorException("Ошибка при валидации токена");
    }
  }

  async registration(data: Users): Promise<Users> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new NotFoundException("User already exists");
    }

    return this.prisma.user.create({ data });
  }
}
