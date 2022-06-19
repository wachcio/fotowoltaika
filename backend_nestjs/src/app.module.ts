import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      isGlobal: true,
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
export class AppModule {}
