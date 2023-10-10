import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { MovementTypes } from 'src/report/interfaces/report';
import { Collaborator } from 'src/collaborator/repository/collaborator.entity';
import { Equipment } from 'src/equipmet/repository/equipment.entity';
import { User } from 'src/users/repository/user.entity';

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
