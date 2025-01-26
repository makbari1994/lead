import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './leads/leads.module';
import { SalespeopleModule } from './salespeople/salespeople.module';

@Module({
  imports: [LeadsModule, SalespeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
