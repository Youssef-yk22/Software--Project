import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
//"mongodb+srv://Database:Database123@cluster0.euppp.mongodb.net/"
