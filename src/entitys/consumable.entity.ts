import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import Defect from './defect.entity';

@Entity({ name: 'defects' })
class Consumable {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  name: string;

  @OneToOne(() => Defect, (defect) => defect.consumable)
  defect: Defect;
}

export default Consumable;
