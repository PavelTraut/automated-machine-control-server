import { Module } from '@nestjs/common';
import { DefectTypesController } from './defect-types.controller';
import { DefectTypesService } from './defect-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DefectType from '../entitys/defect-type';

@Module({
  controllers: [DefectTypesController],
  providers: [DefectTypesService],
  imports: [TypeOrmModule.forFeature([DefectType])],
})
export class DefectTypesModule {}
