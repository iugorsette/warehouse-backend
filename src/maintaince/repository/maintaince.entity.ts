// import { Equipment } from 'src/equipmet/repository/equipment.entity';
import { Equipment } from '../../equipmet/repository/equipment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Maintaince {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'date-start', type: 'timestamp' })
  dateStart: Date;

  @UpdateDateColumn({ name: 'date-end', type: 'timestamp' })
  dateEnd: Date;

  @ManyToOne(() => Equipment, (equipment) => equipment.maintainces)
  equipment: Equipment;
}
