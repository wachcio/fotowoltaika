import { Injectable } from '@nestjs/common';
import { ShopDTO } from 'src/dto/shop.dto';

const shop = [
  { name: 'Ogórki', description: 'Super zdrowe ogórki', price: 5 },
  { name: 'Pomidory', description: 'Super zdrowe pomidory', price: 8 },
  { name: 'Ser', description: 'Pleśniowy', price: 25 },
];

@Injectable()
export class ShopService {
  findAll(): ShopDTO[] {
    return shop;
  }
}
