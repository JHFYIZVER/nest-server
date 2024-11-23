import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TourDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  airlinesId: number;

  @IsNumber()
  @IsNotEmpty()
  travelAgencyId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  pictures: Express.Multer.File[];

  @IsArray()
  @IsNotEmpty()
  includes: string[];

  @IsArray()
  @IsNotEmpty()
  notIncludes: string[];
}
