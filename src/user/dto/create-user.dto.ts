import { IsString, IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 150)
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(3, 16)
    userName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    birthday: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmpassword: string;
}