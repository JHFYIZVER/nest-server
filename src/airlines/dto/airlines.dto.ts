import { IsString, Length } from "class-validator";

export class AirlinesDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  plane: string;
}
