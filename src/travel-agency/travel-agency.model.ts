import { Prisma } from "@prisma/client";

export class TravelAgency implements Prisma.TravelAgencyCreateInput {
  name: string;
}
