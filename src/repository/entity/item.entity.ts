import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column()
  property: string;

  @Column()
  value: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
