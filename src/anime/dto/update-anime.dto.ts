import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class UpdateAnimeDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    nameanime: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    totaleps: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    totaltemp: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    image: string
}

export class WatchedDto {
    
    @IsBoolean()
    assistido: boolean;
   
}