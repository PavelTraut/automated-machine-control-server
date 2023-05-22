import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Defect from './defect.entity';

@Entity({ name: 'defect_types' })
class DefectName {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @OneToMany(() => Defect, (defect) => defect.type)
  defects: Defect[];

  @CreateDateColumn()
  createdAt: Date;
}

export default DefectName;
