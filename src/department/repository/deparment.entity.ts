import { Collaborator } from 'src/collaborator/repository/collaborator.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, unique: true })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.department)
  collaborators: Collaborator[];
}
