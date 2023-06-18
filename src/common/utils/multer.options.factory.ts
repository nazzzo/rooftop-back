import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs'; 

// uploads 폴더가 존재하지 않으면 폴더를 생성하고, 존재하면 생성하지 않습니다.
const mkdir = (directory: string) => {
    const logger = new Logger('Mkdir');
    try {
        fs.readdirSync(path.join(process.cwd(), directory));
    } catch (err) {
        logger.log(
            `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
        );
        fs.mkdirSync(path.join(process.cwd(), directory));
    }
};

mkdir('uploads');


export const multerOptionsFactory = (): MulterOptions => {
    return {
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, path.join(process.cwd(), 'uploads'));
            },

            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                const basename = path.basename(file.originalname, ext);
                done(null, `${basename}_${Date.now()}${ext}`);
            },
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter(req, file, done: (error: Error | null, acceptFile: boolean) => void) {
            const allowedExtensions = ['.jpg', '.png', '.gif'];
            const ext = path.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(ext)) {
                done(null, true);
            } else {
                done(new Error('지원되지 않는 파일 확장자입니다.'), false);
            }
        },
    };
};