import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
    constructor(
        // private configService: ConfigService
    ) { }

  async uploadFile(file: Express.MulterS3.File) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }
    // const apiUrl = this.configService.get('API_URL')
    // const fileUrl = `${apiUrl}/${file.filename}`;
    console.log(`return?:`, file.location)

    return { fileUrl: file.location };
  }
}