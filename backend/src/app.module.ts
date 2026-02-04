import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertsModule } from './concerts/concerts.module';
import { UsersModule } from './users/users.module';
import { HistoriesModule } from './histories/histories.module';
import { User } from './users/entities/user.entity';
import { DatabaseSeedService } from './database/database.seed';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    TypeOrmModule.forFeature([User]),
    ConcertsModule,
    UsersModule,
    HistoriesModule,
    HistoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseSeedService],
})
export class AppModule {}
