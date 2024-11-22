import { Module } from '@nestjs/common';
import { TravelAgencyService } from './travel-agency.service';
import { TravelAgencyController } from './travel-agency.controller';
import { PrismaService } from 'src/prisma.service';
import { TravelAgencyStrategy } from './travel-agency.strategy';

@Module({
  controllers: [TravelAgencyController],
  providers: [TravelAgencyService, PrismaService, TravelAgencyStrategy],
})
export class TravelAgencyModule {}
