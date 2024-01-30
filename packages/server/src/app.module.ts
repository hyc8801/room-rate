import { Dependencies, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BeikeCommunityModule } from './beike-community/beike-community.module';
import { BeikeAreaModule } from './beike-area/beike-area.module';
import { CqBuildingModule } from './cq-building/cq-building.module';
import { CqBuildingRecordModule } from './cq-building-record/cq-building-record.module';

@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'DkdR/Ci5&pCV',
      database: 'house',
      autoLoadEntities: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BeikeCommunityModule,
    BeikeAreaModule,
    CqBuildingModule,
    CqBuildingRecordModule,
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
