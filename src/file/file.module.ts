import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import { multerOptionsFactory } from '../common/utils/multer.options.factory';
import { multerOptionsFactoryS3 } from '../common/utils/multer.options.factory';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ConfigService, ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    MulterModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: multerOptionsFactoryS3,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}