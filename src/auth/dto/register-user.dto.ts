import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  phone: bigint;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}
