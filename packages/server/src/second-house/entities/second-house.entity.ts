import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('beike')
export class SecondHouseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, comment: '区域名称' })
  district_name: string;

  @Column({ nullable: true, comment: '挂牌价格' })
  quoted_price: number;

  @Column({ nullable: true, comment: '贝壳价格' })
  beike_price: number;

  @Column({ nullable: true, comment: '成交数' })
  dealed: number;

  @Column({ nullable: true, comment: '挂牌数' })
  quoted: number;

  @Column({ nullable: true, comment: '新增顾客' })
  customer: number;

  @Column({ nullable: true, comment: '带看次数' })
  showed: number;

  @Column({ nullable: true, comment: '二手房总数' })
  total: number;

  @Column({ nullable: true, comment: '3室总数' })
  total_3room: number;

  @Column({ nullable: true, comment: '2室总数' })
  total_2room: number;

  @Column({ nullable: true, comment: '朝南总套数' })
  total_south: number;

  @Column({ nullable: true, comment: '近地铁总套数' })
  total_subway: number;

  @Column({ nullable: true, comment: '综合1（3房朝南近地铁总套数）' })
  total_3room_south_subway: number;

  @Column({ nullable: true, comment: '综合2（3房朝南总套数）' })
  total_3room_south: number;

  @Column({ nullable: true, comment: '创建时间' })
  create_time: Date;
}
