import { Module } from '@nestjs/common';
import { AirlinesService } from './airlines.service';
import { AirlinesController } from './airlines.controller';
import { PrismaService } from 'src/prisma.service';
import { AirlinesStrategy } from './airlines.strategy';

@Module({
  controllers: [AirlinesController],
  providers: [AirlinesService, PrismaService, AirlinesStrategy],
})
export class AirlinesModule {}
