import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Equipment } from './equipment.entity';
import { Collaborator } from './collaborator.entity';
import { MovementTypes } from 'src/report/interfaces/report';

@Entity()
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: MovementTypes;

  @ManyToOne(() => Equipment)
  equipment: Equipment;

  @ManyToOne(() => Collaborator)
  collaborator: Collaborator;

  @ManyToOne(() => User)
  changeBy: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
