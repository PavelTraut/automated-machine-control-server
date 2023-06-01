import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import Consumable from './consumable.entity';

@Entity({ name: 'consumable_types' })
class ConsumableType {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @OneToMany(() => Consumable, (consumable) => consumable.type)
  consumables: Consumable[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isHide: boolean;
}

export default ConsumableType;
