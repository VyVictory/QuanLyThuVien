import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class CloudinaryController {
    constructor(
        private cloudinaryService: CloudinaryService
    ){}

    @Post('img')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      return this.cloudinaryService.uploadFile(file);
    }
}
