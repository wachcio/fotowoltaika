import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TotalProduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'datetime' }) // Recommended
  timestamp: Date;
}
