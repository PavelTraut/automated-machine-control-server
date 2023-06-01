import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import ConsumableType from './consumable-type.entity';

@Entity({ name: 'consumables' })
class Consumable {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  number: string;

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
