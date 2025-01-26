
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SalespeopleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.salesperson.findMany();
  }
}
