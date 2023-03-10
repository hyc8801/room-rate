import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beike')
export class SecondHouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  district_name: string;

  @Column({ nullable: true })
  quoted_price: number;

  @Column({ nullable: true })
  beike_price: number;

  @Column({ nullable: true })
  dealed: number;

  @Column({ nullable: true })
  quoted: number;

  @Column({ nullable: true })
  customer: number;

  @Column({ nullable: true })
  showed: number;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  total_3room: number;

  @Column({ nullable: true })
  total_2room: number;

  @Column({ nullable: true })
  total_south: number;

  @Column({ nullable: true })
  total_subway: number;

  @Column({ nullable: true })
  total_3room_south_subway: number;

  @Column({ nullable: true })
  total_3room_south: number;

  @Column({ nullable: true })
  create_time: Date;
}
