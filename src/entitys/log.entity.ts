import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'logs' })
class Log {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public message: string;

  @Column()
  public level: string;

  @Column({ nullable: true })
  public user: string;

  @Column({ nullable: true })
  public status: string;

  @Column({ nullable: true })
  public action: string;

  @Column({ nullable: true })
  public body: string;

  @CreateDateColumn()
  creationDate: Date;
}

export default Log;
