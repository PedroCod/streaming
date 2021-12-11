import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { User, Anime } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';


@Injectable()
export class UserService {
    constructor(private db: PrismaService) { }

    async createUser(dados: CreateUserDto): Promise<User> {
        if (dados.password !== dados.confirmpassword) {
            throw new UnauthorizedException('Passwords do not match')
        }
        const emailExist = await this.db.user.findUnique({
            where: { email: dados.email },
        });
        const userNameExist = await this.db.user.findUnique({
            where: { userName: dados.userName },
        });
        if (userNameExist) {
            throw new ConflictException('Username already in use')
        }
        if (emailExist) {
            throw new ConflictException('Email is already in use.');
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(dados.password, salt);

        const user = await this.db.user.create({
            data: {
                ...dados,
                password: hashPassword
            }
        });
        delete user.confirmpassword
        delete user.password
        return user;
    }

    async findUser(id: string): Promise<User> {
        const user = await this.db.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException("ID not found in database")
        }
        delete user.password
        delete user.confirmpassword
        return user
    }
    async findMany(): Promise<any[]> {
        const user = await this.db.user.findMany();
        const userNoPass = user.map(({ password, ...resto }) => resto);
        return userNoPass;
    }
    async update(id: string, dadosDoUsuario: UpdateUserDto): Promise<User> {
        const user = await this.db.user.update({
          data: dadosDoUsuario,
          where: { id: id },
        });
    
        delete user.password;
    
        return user;
      }

    async deleteUser(id: string): Promise<{ message: string }> {
        const user = await this.db.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new NotFoundException("ID not found in database")
        } else {
            await this.db.user.delete({
                where: { id },
            });
        }

        return {
            message: 'successful deleting user'
        };
    }

    async addList(user: User, animeId: string) {
        const anime = await this.db.anime.findUnique({
            where: { id: animeId },
        });
        if (!anime) {
            throw new NotFoundException('Anime not Found.');
        }

        const usuario = await this.db.user.update({
            where: { id: user.id },
            data: {
                animes: {
                    connect: {
                        id: anime.id
                    }
                },
            },
            include: {
                animes: true
            }

        })
        delete usuario.password
        delete usuario.confirmpassword
        return usuario;
    }


}
