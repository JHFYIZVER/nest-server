import { $Enums, Prisma } from "@prisma/client";

export class Users implements Prisma.UserCreateInput {
  name: string;
  surname: string;
  email: string;
  phone: bigint;
  password: string;
  role: $Enums.Role;
}
