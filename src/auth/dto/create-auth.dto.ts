import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CrendentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  password: string;
}