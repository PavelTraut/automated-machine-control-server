import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Defect from './defect.entity';

@Entity({ name: 'defect_names' })
class DefectName {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  defectName: string;

  @OneToMany(() => Defect, (defect) => defect.type)
  defects: Defect[];

  @CreateDateColumn()
  createdAt: Date;
}

export default DefectName;
