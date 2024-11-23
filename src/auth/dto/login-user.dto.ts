import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}
