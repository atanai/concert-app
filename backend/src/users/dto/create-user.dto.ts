import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;
}