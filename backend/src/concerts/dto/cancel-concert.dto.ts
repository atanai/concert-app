import { IsNumber } from 'class-validator';

export class CancelConcertDto {
  @IsNumber()
  userId: number;
}
