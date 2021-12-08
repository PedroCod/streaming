import { Body, Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { User } from '@prisma/client'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto'

@Controller('user')
export class UserController {
    constructor(private service: UserService) { }


    @Post('create')
    createUSer(@Body() data: CreateUserDto): Promise<User> {
        return this.service.createUser(data);
    }
    @Patch('edit/:id')
    editUSer(@Param('id') id: string): Promise<User>{
        return this.service.updateUser(id, data);
    }
    @Get('find/:id')
    findOne (@Param('id') id:string): Promise<User>{
        return this.service.findUser(id)
    }
    @Delete('delete/:id')
    deleteOne (@Param('id') id:string): Promise<User>{
        return this.service.deleteUser(id);
    } 

}
