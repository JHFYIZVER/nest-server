import { IsNumber } from "class-validator";

export class OrderDto {
  @IsNumber()
  tourId: number;

  @IsNumber()
  orderId: number;
}
