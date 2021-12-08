import {
    IsString,
    IsEmail,
    IsOptional,
    IsNotEmpty,
    Length,
  } from 'class-validator';
  
  export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(6, 150)
    nome: string;
  
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    @Length(6, 150)
    email: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    confirmpassword:string;
  }