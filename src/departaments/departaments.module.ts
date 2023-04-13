import { Module } from '@nestjs/common';
import { DepartamentsService } from './departaments.service';
import { DepartamentsController } from './departaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Departament from '../entitys/departament.entity';

@Module({
  providers: [DepartamentsService],
  controllers: [DepartamentsController],
  imports: [TypeOrmModule.forFeature([Departament])],
})
export class DepartamentsModule {}
