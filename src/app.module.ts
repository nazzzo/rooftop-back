import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CollectionModule } from './collection/collection.module';
import { FileModule } from './file/file.module';
import { EventModule } from './event/event.module';
import { CartModule } from './cart/cart.module';
import { AuctionModule } from './auction/auction.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      // cache: true,
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot((process.env.DB_URI || '"mongodb+srv://root:root@cluster0.virefkw.mongodb.net/?retryWrites=true&w=majority'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BookModule,
    AuthModule,
    CollectionModule,
    FileModule,
    EventModule,
    CartModule,
    AuctionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
