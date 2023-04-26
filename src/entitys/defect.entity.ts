import {
  UpdateDateColumn,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import Machine from './machine.entity';
import Consumable from './consumable.entity';
import User from './user.entity';

@Entity({ name: 'defects' })
class Defect {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: false })
  isResolved: boolean;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  decisionDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Consumable)
  @JoinTable()
  consumables: Consumable[];

  @ManyToMany(() => User)
  @JoinTable()
  responsible: User[];

  @ManyToOne(() => Machine, (machine) => machine.defects)
  machine: Machine;
}

export default Defect;
