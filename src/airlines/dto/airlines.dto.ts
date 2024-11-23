import { IsNotEmpty, IsString, Length } from "class-validator";

export class AirlinesDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  plane: string;
}
