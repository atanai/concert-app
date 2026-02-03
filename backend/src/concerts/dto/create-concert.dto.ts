import { IsString, IsNumber } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    seats: number;

    @IsNumber()
    reservedSeats: number;

    @IsNumber()
    cancelledSeats: number;
}