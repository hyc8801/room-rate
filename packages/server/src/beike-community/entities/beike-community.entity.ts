import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('beike_community')
export class BeikeCommunityEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '小区名称',
  })
  name: string;

  @Column({ type: 'int', nullable: false, comment: '二手房总数' })
  total: number;

  @Column({ type: 'int', nullable: false, comment: '三房朝南总数' })
  total_3room_south: number | null;

  @Column({ type: 'int', nullable: false, comment: '今日挂牌总数' })
  quoted: number;

  @Column({ type: 'int', nullable: false, comment: '平均价格' })
  average_price: number;

  @Column({ type: 'int', nullable: false, comment: '90天成交数据' })
  dealed: number;
  @Column({ type: 'int', nullable: false, comment: '30天带看数据' })
  showed: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time?: Date;
}
