import { Injectable } from "@nestjs/common";
import { Users } from "./users.model";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.user.findMany();
  }
}
