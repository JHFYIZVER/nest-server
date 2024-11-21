import { Injectable, NotFoundException } from "@nestjs/common";
import { Users } from "./users.model";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.user.findMany();
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
