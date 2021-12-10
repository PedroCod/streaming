import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CrendentialsDto } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async login(dados: CrendentialsDto){
    const userExist = await this.db.user.findUnique({
      where: {userName: dados.userName},
    });
    if(!userExist){
      throw new NotFoundException('User not found')
    }

    const passwordValid = await bcrypt.compare(
      dados.password,
      userExist.password,
    );
    if(passwordValid){
      const ingresso = {
        userName: userExist.userName
      };
      const token = await this.jwt.sign(ingresso);
      return { token }
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
    
  

  }
}
