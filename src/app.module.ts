import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { AirlinesModule } from './airlines/airlines.module';

@Module({
  imports: [UsersModule, AuthModule, AirlinesModule],
})
export class AppModule {}
