import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DataDto {
  @IsDateString()
  @IsNotEmpty()
  departureDate: Date;

  @IsDateString()
  @IsNotEmpty()
  returnDate: Date;

  @IsString()
  @IsNotEmpty()
  flightTime: string;

  @IsNumber()
  @IsNotEmpty()
  tourId: number;
}
