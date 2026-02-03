import { IsNumber, IsString } from "class-validator";

export class CreateHistoryDto {
    @IsString()
    dateTime: string;
    
    @IsNumber()
    userId: number;

    @IsNumber()
    concertId: number;

    @IsNumber()
    action: number; // 0 for cancellation, 1 for reservation
}
