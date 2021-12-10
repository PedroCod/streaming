import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

import { AnimeModule } from './anime/anime.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AnimeModule, AuthModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
