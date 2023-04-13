import { Module } from '@nestjs/common';
import { DefectsController } from './defects.controller';
import { DefectsService } from './defects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';
import { ConsumablesModule } from '../consumables/consumables.module';

@Module({
  controllers: [DefectsController],
  providers: [DefectsService],
  imports: [TypeOrmModule.forFeature([Defect]), ConsumablesModule],
})
export class DefectsModule {}
