import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Machine from './machine.entity';
import User from './user.entity';

@Entity({ name: 'departaments' })
class Departament {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.departament)
  workers: User[];

  @OneToMany(() => Machine, (machine) => machine.departament, {
    onDelete: 'CASCADE',
  })
  machines: Machine[];

  @CreateDateColumn()
  createdAt: Date;
}

export default Departament;
