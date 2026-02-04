import { IsNumber, IsString } from "class-validator";

export class CreateHistoryDto {    
    @IsNumber()
    userId: number;

    @IsNumber()
    concertId: number;

    @IsNumber()
    action: number; // 0 for cancellation, 1 for reservation
}
