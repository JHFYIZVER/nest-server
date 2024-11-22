import { Prisma } from "@prisma/client";

export class Airlines implements Prisma.AirlinesCreateInput {
  name: string;
  logo: string;
  plane: string;
}
