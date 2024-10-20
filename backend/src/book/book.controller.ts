import { Body, Controller, HttpException, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { create } from 'domain';
import { CreateBookDto } from './dto/createBook.dto';
import { AuthGuardD } from 'src/auth/guard/auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { JwtService } from '@nestjs/jwt';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '../auth/decorator/current.user';
import { User } from '../auth/Schemas/user.schema';

@Controller('book')
export class BookController {
    constructor(
        private bookService: BookService,
        private jwtService: JwtService
    ) {}


    @Post('createBook')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
    async createBook(
    @CurrentUser() currentUser: User,
    @Body() createBookDto: CreateBookDto, 
    @UploadedFiles() files: { files: Express.Multer.File[] } 
) {
    // Kiểm tra nếu currentUser không tồn tại
    if (!currentUser) {
        throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
    }
    // Log thông tin người dùng hiện tại để kiểm tra
    console.log('Current User:', currentUser);
    console.log('Uploaded Files:', files); 
    console.log('role:',currentUser.role);

    // Gọi phương thức tạo bài viết trong PostService
    return this.bookService.createBook(createBookDto, currentUser._id.toString(), files.files); 
}
    
    
    
}
