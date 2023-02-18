import { Module } from '@nestjs/common';
import { MachinesController } from './machines.controller';
import { MachinesService } from './machines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Machine from '../entitys/machine.entity';

@Module({
  controllers: [MachinesController],
  providers: [MachinesService],
  imports: [TypeOrmModule.forFeature([Machine])],
})
export class MachinesModule {}
