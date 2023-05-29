import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import User from './user.entity';
import DefectType from './defect-type';

@Entity({ name: 'specializations' })
class Specialization {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.specialization)
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => DefectType)
  @JoinTable()
  types: DefectType[];
}

export default Specialization;
