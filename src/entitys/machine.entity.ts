import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Defect from './defect.entity';
import Departament from './departament.entity';

@Entity({ name: 'machines' })
class Machine {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @Column({ default: true })
  description: string;

  @Column({ nullable: true })
  model: string;

  @Column({ nullable: true })
  number: string;

  @Column({ nullable: true })
  startYear: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Departament, (departament) => departament.machines, {
    onDelete: 'CASCADE',
  })
  departament: Departament;

  @OneToMany(() => Defect, (defect) => defect.machine, {
    onDelete: 'SET NULL',
  })
  defects: Defect[];
}

export default Machine;
