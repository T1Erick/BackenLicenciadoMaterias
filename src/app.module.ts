import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasModule } from './modules/ventas/ventas.module';
import { VentasService } from './modules/ventas/services/ventas.service';




@Module({
  imports: [ItemsModule, VentasModule,],
  controllers: [AppController],
  providers: [AppService, VentasService],
})
export class AppModule {}
