import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class DayDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Current_DC_String_1: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Current_DC_String_2: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Voltage_DC_String_1: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Voltage_DC_String_2: number;

  @Column({ type: 'int', precision: 11 })
  Temperature_Powerstage: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Voltage_AC_Phase_1: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Voltage_AC_Phase_2: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Voltage_AC_Phase_3: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Current_AC_Phase_1: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Current_AC_Phase_2: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Current_AC_Phase_3: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  PowerReal_PAC_Sum: number;

  @Column({ type: 'float', precision: 8, scale: 2 })
  EnergyReal_WAC_Sum_Produced: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Power_String_1: number;

  @Column({ type: 'float', precision: 6, scale: 2 })
  Power_String_2: number;

  @Column({ type: 'datetime' }) // Recommended
  timestamp: Date;
}
