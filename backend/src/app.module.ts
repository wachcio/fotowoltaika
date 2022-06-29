import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchiveDataModule } from './archive-data/archive-data.module';
import { DayDetailsModule } from './day-details/day-details.module';
import { MonthlyProductionModule } from './monthly-production/monthly-production.module';
import { YearlyProductionModule } from './yearly-production/yearly-production.module';
import { InverterRealtimeDataModule } from './inverter-realtime-data/inverter-realtime-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
      // synchronize: true,
      logging: true,
    }),

    ArchiveDataModule,
    DayDetailsModule,
    MonthlyProductionModule,
    YearlyProductionModule,
    InverterRealtimeDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
