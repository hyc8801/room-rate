import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('new_flats_record')
export class NewFlatsRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar', length: 100, comment: '小区名称' })
  community: string;

  @Column({ nullable: true, type: 'varchar', length: 100, comment: '建筑id' })
  buildingid: string;

  @Column({ nullable: true, comment: '网签数量' })
  wangqian_num: number;

  @Column({ nullable: true, comment: '认购数量' })
  rengou_num: number;

  @Column({ nullable: true, comment: '期房数量' })
  qifang_num: number;

  @Column({ nullable: true, type: 'longtext', comment: '期房列表' })
  qifang_list: string;

  @Column({ nullable: true, type: 'longtext', comment: '成交列表' })
  dealed_list: string;

  @Column({ nullable: true, comment: '成交数量' })
  dealed: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  create_time: Date;
}
