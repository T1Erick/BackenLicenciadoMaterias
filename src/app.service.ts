import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Class Web Aplication Programming 2023 (._.)';
  }
  getAll():string []{
    return ["zapatos", "Zapatos Deportivos"]
  }

  
}
