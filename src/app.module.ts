import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { AirlinesModule } from './airlines/airlines.module';
import { TravelAgencyModule } from './travel-agency/travel-agency.module';

@Module({
  imports: [UsersModule, AuthModule, AirlinesModule, TravelAgencyModule],
})
export class AppModule {}
