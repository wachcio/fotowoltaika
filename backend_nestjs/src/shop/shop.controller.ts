import { Controller, Get } from '@nestjs/common';
import { ShopDTO } from 'src/dto/shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}
  @Get('/')
  findAll(): ShopDTO[] {
    {
      return this.shopService.findAll();
    }
  }
}
