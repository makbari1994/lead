
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLeadDto, AssignSalespersonDto } from './leads.dto';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.lead.findMany({
      include: { salesperson: true },
    });
  }

  async create(createLeadDto: CreateLeadDto) {
    return this.prisma.lead.create({ data: createLeadDto });
  }

  async assignSalesperson(
    id: string,
    assignSalespersonDto: AssignSalespersonDto,
  ) {
    return this.prisma.lead.update({
      where: { id },
      data: { salespersonId: assignSalespersonDto.id },
    });
  }
}
