import { IsString, IsNotEmpty, } from "class-validator";

export class CreateAnimeDto {
    @IsString()
    @IsNotEmpty()
    nameanime: string

    @IsString()
    @IsNotEmpty()
    nameenglish: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    totaleps: string

    @IsString()
    @IsNotEmpty()
    totaltemp: string

    @IsString()
    @IsNotEmpty()
    image: string

}
