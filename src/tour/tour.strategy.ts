import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class TourStrategy extends PassportStrategy(Strategy, "tour") {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { email: string }) {

    const user = await this.prisma.user.findUnique({
      where: { email: payload.email }, 
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return user;
  }
}
