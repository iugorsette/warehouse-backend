import { Collaborator } from 'src/collaborator/repository/collaborator.entity';
import { Item } from 'src/item/repository/item.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500, unique: true, nullable: true })
  register: string | null;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Item, (item) => item.equipment)
  items: Item[];

  @ManyToMany(() => Collaborator, (collaborator) => collaborator.equipments)
  collaborators: Collaborator[];
}
