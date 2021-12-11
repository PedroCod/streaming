import { Body, Controller, Get, Post, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto'
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/auth/auth-user.decorator';

@Controller('user')
export class UserController {
    constructor(private service: UserService) { }


    @Post('create')
    createUSer(@Body() data: CreateUserDto): Promise<User> {
        return this.service.createUser(data);
    }
    @Patch('edit/:id')
    editUSer(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        return this.service.update(id, data);
    }
    @Get('find/:id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.service.findUser(id)
    }
    
    @Get('findMany')
    findMany(): Promise<any[]> {
      return this.service.findMany();
    }
    @Delete('delete/:id')
    deleteOne(@Param('id') id: string): Promise<{ message: string }> {
        return this.service.deleteUser(id);
    }
    @UseGuards(AuthGuard())
    @Patch('addList/:id')
    addList(@AuthUser() user: User, @Param('id') animeId: string) {
      return this.service.addList(user, animeId);
    }

}
