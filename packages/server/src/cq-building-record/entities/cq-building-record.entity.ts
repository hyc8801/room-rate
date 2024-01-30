import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cq_building_record')
export class CqBuildingRecordEntity {
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

  @Column({ nullable: true, comment: '期房/现房数量' })
  qifang_num: number;

  @Column({ nullable: true, type: 'longtext', comment: '期房/现房列表' })
  qifang_list: string;

  @Column({ nullable: true, type: 'longtext', comment: '成交列表' })
  dealed_list: string;

  @Column({ nullable: true, comment: '成交数量' })
  dealed: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time: Date;
}
