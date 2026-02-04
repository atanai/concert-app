import { IsNumber } from 'class-validator';

export class ReserveConcertDto {
  @IsNumber()
  userId: number;
}
