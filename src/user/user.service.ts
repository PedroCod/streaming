import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(private db: PrismaService) {}

    async createUser(data: CreateUserDto): Promise<User> {
        if (data.confirmpassword !== data.password) {
            throw new UnauthorizedException('Passwords do not match')
        } else {
            delete data.confirmpassword;
        }
        const emailExist = await this.db.user.findUnique({
            where: { email: data.email },
        });
        const userNameExist = await this.db.user.findUnique({
            where: { userName: data.userName},
        });
        if(userNameExist){
            throw new ConflictException('Username already in use')
        }
        if(emailExist){
            throw new ConflictException('Email is already in use.');
        }
        const salt = 10;
        const hashPassword = await bcrypt.hash(data.password, salt);
        
        delete data.confirmpassword;

        const user = await this.db.user.create({
            data: {
                ...data,
                password: hashPassword
            }
        });
        delete user.password
        return user;
    }

    async findUser(id:string): Promise<User>{
        const user = await this.db.user.findUnique({
            where: { id }
        });
        if(!user){
            throw new NotFoundException("ID not found in database")
        }
        delete user.password
        return user
    }
    
    async updateUser( id:string, data :UpdateUserDto): Promise<User> {
        return this.db.user.update({
            where: { id: id },
            data
        });
    }
    
    async deleteUser(id:string): Promise<{ message:string }> {
        await this.db.user.delete({
            where: { id }
        });
        
        return {
            message: 'successful deleting user'
        }
    }


}
