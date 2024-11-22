import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AirlinesModule } from "./airlines/airlines.module";
import { TravelAgencyModule } from "./travel-agency/travel-agency.module";
import { TourModule } from "./tour/tour.module";
import { DataModule } from "./data/data.module";
import { OrderModule } from "./order/order.module";
import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AirlinesModule,
    TravelAgencyModule,
    TourModule,
    DataModule,
    OrderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveRoot: "/static",
    }),
  ],
})
export class AppModule {}
