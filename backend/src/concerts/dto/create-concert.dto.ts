import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    seats: number;
}