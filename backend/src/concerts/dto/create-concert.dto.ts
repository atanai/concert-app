import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    seats: number;

    @IsArray()
    reservedSeats: number[]; // User IDs of reserved seats

    @IsArray()
    cancelledSeats: number[]; // User IDs of cancelled seats
}