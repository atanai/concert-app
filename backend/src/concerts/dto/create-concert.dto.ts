import { IsInt, IsString, Min } from 'class-validator';

export class CreateConcertDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    @Min(1)
    seats: number;
}
