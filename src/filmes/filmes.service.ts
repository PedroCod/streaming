import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmesService {
    db = [];
    
    createFilme(data){
        this.db.push(data)
        return this.db
    }
}
