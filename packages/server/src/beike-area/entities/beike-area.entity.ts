import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('beike_area')
export class BeikeAreaEntity {
  @PrimaryGeneratedColumn()
  id: number; // 主键ID

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '区域名称' })
  district_name: string | null;

  @Column({ type: 'int', nullable: true, comment: '挂牌价格' })
  quoted_price: number | null;

  @Column({ type: 'int', nullable: true, comment: '贝壳价格' })
  beike_price: number | null;

  @Column({ type: 'int', nullable: true, comment: '成交数量' })
  dealed: number | null;

  @Column({ type: 'int', nullable: true, comment: '挂牌数' })
  quoted: number | null;

  @Column({ type: 'int', nullable: true, comment: '新增顾客' })
  customer: number | null;

  @Column({ type: 'int', nullable: true, comment: '带看次数' })
  showed: number | null;

  @Column({ type: 'int', nullable: true, comment: '二手房总数' })
  total: number | null;

  @Column({ type: 'int', nullable: true, comment: '3室总数' })
  total_3room: number | null;

  @Column({ type: 'int', nullable: true, comment: '2室总数' })
  total_2room: number | null;

  @Column({ type: 'int', nullable: true, comment: '朝南总套数' })
  total_south: number | null;

  @Column({ type: 'int', nullable: true, comment: '近地铁总套数' })
  total_subway: number | null;

  @Column({
    type: 'int',
    nullable: true,
    comment: '综合1（3房朝南近地铁总套数）',
  })
  total_3room_south_subway: number | null;

  @Column({ type: 'int', nullable: true, comment: '综合2（3房朝南总套数）' })
  total_3room_south: number | null;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;
}
