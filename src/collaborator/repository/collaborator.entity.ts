import { Department } from 'src/department/repository/deparment.entity';
import { Equipment } from 'src/equipmet/repository/equipment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  role: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Department, (department) => department.collaborators)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToMany(() => Equipment, (equipment) => equipment.collaborators)
  @JoinTable()
  equipments?: Equipment[];
}
