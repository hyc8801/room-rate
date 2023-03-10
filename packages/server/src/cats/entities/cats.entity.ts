import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cats')
export class Cats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: number;
}
