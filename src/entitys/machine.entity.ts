import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import Defect from './defect.entity';
import Departament from './departament.entity';

@Entity({ name: 'machines' })
class Machine {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  name: string;

  @Column({ default: true })
  description: string;

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

  @OneToMany(() => Defect, (defect) => defect.machine)
  defects: Defect[];
}

export default Machine;
