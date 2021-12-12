import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Anime } from '@prisma/client';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto, WatchedDto } from './dto/update-anime.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @UseGuards(AuthGuard())
  @Post('create-anime')
  create(@Body() createAnimeDto: CreateAnimeDto): Promise<Anime> {
    return this.animeService.create(createAnimeDto);
  }

  @Get('get-anime')
  findAll(): Promise<Anime[]> {
    return this.animeService.findAll();
  }

  @UseGuards(AuthGuard())
  @Get('get-one/:id')
  findOne(@Param('id') id: string): Promise<Anime> {
    return this.animeService.findOne(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update-anime/:id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    return this.animeService.update(id, updateAnimeDto);
  }

  @UseGuards(AuthGuard())
  @Delete('delete-anime/:id')
  remove(@Param('id') id: string): Promise<{message: string}> {
    return this.animeService.remove(id);
  }

  @UseGuards(AuthGuard())
  @Patch('update-watched/:id')
  updateWatched(@Param('id') id: string, @Body() dados: WatchedDto): Promise<Anime> {
    return this.animeService.updateWatched(id, dados);
  }
}
