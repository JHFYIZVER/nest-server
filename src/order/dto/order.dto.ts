import { IsNotEmpty, IsNumber } from "class-validator";

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  tourId: number;

  @IsNumber()
  @IsNotEmpty()
  orderId: number;
}
