import { IsString, Length } from "class-validator";

export class TravelAgencyDto {
  @IsString()
  @Length(2, 50)
  name: string;
}
