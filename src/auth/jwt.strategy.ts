import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private db: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: {userName: string}) {
        const user = await this.db.user.findUnique({
            where : { userName: payload.userName},
        });
        if (!user) { 
            throw new UnauthorizedException('User Not Found')
        }
        return user;
    }
}