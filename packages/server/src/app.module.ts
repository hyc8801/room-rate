import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cats } from './cats/entities/cats.entity';
import { SecondHouseController } from './second-house/second-house.controller';
import { SecondHouseService } from './second-house/second-house.service';
import { SecondHouseModule } from './second-house/second-house.module';
import { DataSource } from 'typeorm';
import { SecondHouseEntity } from './second-house/entities/second-house.entity';
import { CommunityModule } from './community/community.module';
import { CommunityEntity } from './community/entities/community.entity';
import { NewFlatsModule } from './new-flats/new-flats.module';
import { NewFlatsController } from './new-flats/new-flats.controller';
import { NewFlatsService } from './new-flats/new-flats.service';
import { NewFlatsEntity } from './new-flats/entities/new-flats.entitys';
import { NewFlatsRecordModule } from './new-flats-record/new-flats-record.module';
import { NewFlatsRecordEntity } from './new-flats-record/entities/new-flats-record.entity';

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
      entities: [
        Cats,
        SecondHouseEntity,
        CommunityEntity,
        NewFlatsEntity,
        NewFlatsRecordEntity,
      ],
      synchronize: true,
    }),
    CatsModule,
    SecondHouseModule,
    CommunityModule,
    NewFlatsModule,
    NewFlatsRecordModule,
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
