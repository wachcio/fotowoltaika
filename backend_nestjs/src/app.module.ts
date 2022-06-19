import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './shop/shop.controller';
import { ShopService } from './shop/shop.service';
import { BasketController } from './basket/basket.controller';
import { BasketService } from './basket/basket.service';
import { ArchiveDataModule } from './archive-data/archive-data.module';
import { DayDetailsModule } from './day-details/day-details.module';
import { MonthlyProductionModule } from './monthly-production/monthly-production.module';
import { YearlyProductionModule } from './yearly-production/yearly-production.module';
import { InverterRealtimeDataModule } from './inverter-realtime-data/inverter-realtime-data.module';

@Module({
  imports: [ArchiveDataModule, DayDetailsModule, MonthlyProductionModule, YearlyProductionModule, InverterRealtimeDataModule],
  controllers: [AppController, ShopController, BasketController],
  providers: [AppService, ShopService, BasketService],
})
export class AppModule {}
