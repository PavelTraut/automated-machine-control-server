import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';

@Entity({ name: 'defects' })
class Departament {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.departament)
  workers: User[];
}

export default Departament;
