import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [PassportModule.register({defaultStrategy: 'jwt'}), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: '60m',
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy]
})
export class AuthModule { }
