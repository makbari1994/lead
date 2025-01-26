
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto, AssignSalespersonDto } from './leads.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }

  @Patch(':id/assign')
  assignSalesperson(
    @Param('id') id: string,
    @Body() assignSalespersonDto: AssignSalespersonDto,
  ) {
    return this.leadsService.assignSalesperson(id, assignSalespersonDto);
  }
}
