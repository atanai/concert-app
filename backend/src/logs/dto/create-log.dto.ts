import { IsNumber, IsDate } from 'class-validator';

export class CreateLogDto {
    @IsDate()
    date: Date;

    @IsNumber()
    userId: number;

    @IsNumber()
    concertId: number;

    @IsNumber()
    action: number; // 0 - cancel, 1 - reserve
}