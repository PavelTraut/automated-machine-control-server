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
import Specialization from './specialization.entity';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => Departament, (departament) => departament.workers, {
    onDelete: 'SET NULL',
  })
  departament: Departament;

  @OneToMany(() => Defect, (defect) => defect.responsible)
  responsibleDefects: Defect[];

  @ManyToOne(() => Specialization, (specialization) => specialization.users, {
    onDelete: 'SET NULL',
  })
  specialization: Specialization;

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
