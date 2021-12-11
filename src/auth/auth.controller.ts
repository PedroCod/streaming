import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import AuthUser from './auth-user.decorator';
import { AuthService } from './auth.service';
import { CrendentialsDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dados: CrendentialsDto) {
    return this.authService.login(dados);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  profile(@AuthUser() user: User): User{
    return user
  }
}