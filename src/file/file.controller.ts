import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';


@Controller('file')
export class FileController {
  constructor(private fileService: FileService) { }

  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {

  //   return this.fileService.uploadFile(file);
  // }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImg(
    @UploadedFile() file: Express.MulterS3.File) {
    return await this.fileService.uploadFile(file);
  }
}