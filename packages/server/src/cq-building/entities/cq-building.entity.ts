import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cq_building')
export class CqBuildingEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '楼栋名称',
  })
  name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '建筑id',
  })
  buildingid: string;

  @Column({
    nullable: true,
    comment: '楼栋状态，1为已售罄',
    default: () => 0,
  })
  status?: number;

  @Column({
    nullable: true,
    type: 'longtext',
    comment: '楼栋原始数据',
  })
  data?: string;

  @Column({
    nullable: true,
    type: 'longtext',
    comment: '项目名称',
  })
  projectname: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '项目id',
  })
  projectid: string;

  @Column({
    nullable: true,
    comment: '总套数',
  })
  total: number;

  @Column({
    nullable: true,
    comment: '每层楼有多少个房间',
  })
  rn: number;

  @Column({
    nullable: true,
    comment: '单元数',
  })
  unit: number;

  @Column({
    nullable: true,
    comment: '楼层高度',
  })
  floor: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100,
    comment: '小区名称',
  })
  community: string;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  update_time?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  create_time?: Date;
}
