import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { NewFlatsModule } from './new-flats/new-flats.module';
import { NewFlatsRecordModule } from './new-flats-record/new-flats-record.module';
import { BeikeCommunityModule } from './beike-community/beike-community.module';
import { BeikeAreaModule } from './beike-area/beike-area.module';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DkdR/Ci5&pCV',
      database: 'blog',
      autoLoadEntities: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CatsModule,
    NewFlatsModule,
    NewFlatsRecordModule,
    BeikeCommunityModule,
    BeikeAreaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }
}
