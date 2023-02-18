import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import Role from '../types/Role';

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

  @CreateDateColumn()
  createdDate: Date;
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
