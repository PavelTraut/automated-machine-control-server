import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Defect from './defect.entity';
import Consumable from './consumable.entity';

@Entity({ name: 'consumable_types' })
class ConsumableType {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  name: string;

  @OneToMany(() => Defect, (consumable) => consumable.type)
  consumables: Consumable[];
}

export default ConsumableType;
