import { IsNumber, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  email: string;

  @IsNumber()
  phone: bigint;

  @IsString()
  @Length(6, 12)
  password: string;
}
