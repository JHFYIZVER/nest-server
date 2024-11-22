import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Users } from "./users.model";
import { PrismaService } from "src/prisma.service";

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
