import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('community')
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  total: number;

  @Column({ nullable: true })
  total_3room_south: number;

  @Column({ nullable: true })
  quoted: number;

  @Column({ nullable: true })
  average_price: number;

  @Column({ nullable: true })
  dealed: number;

  @Column({ nullable: true })
  showed: number;

  @Column({ nullable: true })
  create_time: Date;
}
