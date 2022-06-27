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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pv_test',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
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
