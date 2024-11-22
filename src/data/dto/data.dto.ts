import { IsDateString, IsNumber, IsString } from "class-validator";

export class DataDto {
  @IsDateString()
  departureDate: Date;

  @IsDateString()
  returnDate: Date;

  @IsString()
  flightTime: string;

  @IsNumber()
  tourId: number;
}
