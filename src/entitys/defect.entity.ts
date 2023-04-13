import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import Machine from './machine.entity';

@Entity({ name: 'defects' })
class Defect {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  isResolved: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(()=>Machine,(machine)=>machine.defects)
  machine:Machine
}

export default Defect;
