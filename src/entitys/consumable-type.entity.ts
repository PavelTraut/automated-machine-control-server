import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import Defect from './defect.entity';
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
}

export default ConsumableType;
