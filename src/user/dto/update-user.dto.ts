import {
    IsString,
    IsOptional,
    IsNotEmpty,
    Length,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(6, 150)
    name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password:string;

  }