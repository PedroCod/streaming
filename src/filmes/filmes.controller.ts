import { Body, Controller, Post } from '@nestjs/common';
import { FilmesService } from './filmes.service';

@Controller('filmes')
export class FilmesController {
    constructor(private service: FilmesService){}
    
    @Post('create')
    createFilme(@Body() data){
        return this.service.createFilme(data);
    }
}
