import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import Role from '../types/Role';
import Departament from './departament.entity';
import Defect from './defect.entity';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Departament, (departament) => departament.workers)
  departament: Departament;

  @OneToMany(() => Defect, (defect) => defect.responsible)
  responsibleDefects: Defect[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;

      this.password = await new Promise((resolve, reject) => {
        hash(this.password, saltRounds, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
    }
  }
}

export default User;
