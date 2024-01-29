import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beike_community')
export class CommunityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, comment: '小区名称' })
  name: string;

  @Column({ nullable: true, comment: '二手房总数' })
  total: number;

  @Column({ nullable: true, comment: '三房朝南总数' })
  total_3room_south: number;

  @Column({ nullable: true, comment: '今日挂牌总数' })
  quoted: number;

  @Column({ nullable: true, comment: '平均价格' })
  average_price: number;

  @Column({ nullable: true, comment: '90天成交数据' })
  dealed: number;

  @Column({ nullable: true, comment: '30天带看数据' })
  showed: number;

  @Column({ nullable: true, comment: '创建时间' })
  create_time: Date;
}
