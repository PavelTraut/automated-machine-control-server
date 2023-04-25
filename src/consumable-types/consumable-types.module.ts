import { Module } from '@nestjs/common';
import { ConsumableTypesController } from './consumable-types.controller';
import { ConsumableTypesService } from './consumable-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConsumableType from '../entitys/consumable-type.entity';

@Module({
  controllers: [ConsumableTypesController],
  providers: [ConsumableTypesService],
  imports: [TypeOrmModule.forFeature([ConsumableType])],
})
export class ConsumableTypesModule {}
