import { Global, Module } from '@nestjs/common';
import { VentasProvider } from './providers/ventas.providers';


@Global()
@Module({
    imports:[DataBaseModule],
    controllers:[],
    providers:[...VentasProvider],
})
export class VentasModule {}
