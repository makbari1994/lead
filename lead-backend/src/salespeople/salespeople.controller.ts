
import { Controller, Get } from '@nestjs/common';
import { SalespeopleService } from './salespeople.service';

@Controller('salespeople')
export class SalespeopleController {
  constructor(private readonly salespeopleService: SalespeopleService) {}

  @Get()
  findAll() {
    return this.salespeopleService.findAll();
  }
}
