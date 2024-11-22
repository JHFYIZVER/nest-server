import { IsArray, IsNumber, IsString } from "class-validator";

export class TourDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsNumber()
  price: number;

  @IsNumber()
  airlinesId: number;

  @IsNumber()
  travelAgencyId: number;

  @IsString()
  description: string;

  @IsArray()
  pictures: Express.Multer.File[];

  @IsArray()
  includes: string[];

  @IsArray()
  notIncludes: string[];
}
