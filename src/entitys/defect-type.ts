import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import Defect from './defect.entity';

@Entity({ name: 'defect_types' })
class DefectType {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @OneToMany(() => Defect, (defect) => defect.type)
  defects: Defect[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isHide: boolean;
}

export default DefectType;
