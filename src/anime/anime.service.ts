import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Anime } from '@prisma/client'
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto, WatchedDto } from './dto/update-anime.dto';

@Injectable()
export class AnimeService {
  constructor(private db: PrismaService) { }
  
  async create(dados: CreateAnimeDto): Promise<Anime> {
    const animeExist = await this.db.anime.findUnique({
      where: { nameanime: dados.nameanime },
    });
    if (animeExist) {
      throw new ConflictException('This anime has already been registered in our database.')
    }
    const anime = await this.db.anime.create({ data: dados });
    return anime
  }

  async findAll(): Promise<Anime[]> {
   const animes = await this.db.anime.findMany();
   return animes;
  }

  async findOne(id: string): Promise<Anime> {
    const animeExist = await this.db.anime.findUnique({
      where: { id }
    });
    if (!animeExist){
      throw new NotFoundException(
        "Anime with the entered ID is not in our database"
      )
    }
    return animeExist
  }

  async update(id: string, dados: UpdateAnimeDto): Promise<Anime> {
    const anime = await this.db.anime.update({
      data: dados,
      where: { id }
    })
    return anime;
  }

  async remove(id: string): Promise<{message: string}> {
    const animeExist = await this.db.anime.findUnique({
      where: { id },
    });
    if(!animeExist) {
      throw new NotFoundException(
        'Anime with the entered ID is not in our database'
      )
    }else {
      await this.db.anime.delete({
        where: {id}
      })
    }
    return {message:'Anime found and deleted'}
  }

  async updateWatched (id: string, dados: WatchedDto): Promise<Anime> {
    const anime = await this.db.anime.update({
      data: dados,
      where: {id},
    })
    return anime;
  }
}
