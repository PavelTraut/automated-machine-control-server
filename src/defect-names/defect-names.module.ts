import { Module } from '@nestjs/common';
import { DefectNamesController } from './defect-names.controller';
import { DefectNamesService } from './defect-names.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DefectName from '../entitys/defect-name.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DefectName])],
  controllers: [DefectNamesController],
  providers: [DefectNamesService],
  exports: [DefectNamesService],
})
export class DefectNamesModule {}
