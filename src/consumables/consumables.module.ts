import { Module } from '@nestjs/common';
import { ConsumablesService } from './consumables.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumablesController } from './consumables.controller';
import Consumable from '../entitys/consumable.entity';

@Module({
  providers: [ConsumablesService],
  imports: [TypeOrmModule.forFeature([Consumable])],
  exports: [ConsumablesService],
  controllers: [ConsumablesController],
})
export class ConsumablesModule {}
