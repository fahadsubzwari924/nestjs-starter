import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    ProductModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/nest-test')
  ],
controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
