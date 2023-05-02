import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Defect from './defect.entity';
import ConsumableType from './consumable-type.entity';

@Entity({ name: 'consumables' })
class Consumable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => ConsumableType, (type) => type.consumables, {
    onDelete: 'SET NULL',
  })
  type: ConsumableType;

  @CreateDateColumn()
  createdAt: Date;
}

export default Consumable;
