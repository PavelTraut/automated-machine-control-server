import { Module } from '@nestjs/common';
import { DefectsController } from './defects.controller';
import { DefectsService } from './defects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Defect from '../entitys/defect.entity';

@Module({
  controllers: [DefectsController],
  providers: [DefectsService],
  imports: [TypeOrmModule.forFeature([Defect])],
})
export class DefectsModule {}
