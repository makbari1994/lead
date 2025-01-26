
import { Module } from '@nestjs/common';
import { SalespeopleController } from './salespeople.controller';
import { SalespeopleService } from './salespeople.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SalespeopleController],
  providers: [SalespeopleService, PrismaService],
})
export class SalespeopleModule {}
