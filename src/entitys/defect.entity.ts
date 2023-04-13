import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Machine from './machine.entity';
import Consumable from './consumable.entity';
import User from './user.entity';

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

  @Column({ nullable: true })
  decisionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToOne(() => Consumable, (consumable) => consumable.defect)
  consumable: Consumable;

  @ManyToOne(() => User, (user) => user.responsibleDefects)
  responsible: User;

  @ManyToOne(() => Machine, (machine) => machine.defects)
  machine: Machine;
}

export default Defect;
