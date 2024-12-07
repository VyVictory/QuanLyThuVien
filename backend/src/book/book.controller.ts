import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { create } from 'domain';
import { CreateBookDto } from './dto/createBook.dto';
import { UpdateBookDto } from './dto/updateBook.dto';
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


  @Put('updateBook/:bookId')
  @UseGuards(new RolesGuard(['0','2']))  //(0admin,1user,2manager)
  @UseGuards(AuthGuardD)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 10 }]))
  async updateBook(
    @CurrentUser() currentUser: User,
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFiles() files: { files: Express.Multer.File[] }
  )
  {
    if (!currentUser) {
        throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
    }

    console.log('Current User:', currentUser);
    console.log('Uploaded Files:', files); 
    console.log('role:',currentUser.role);

    return this.bookService.updateBook(bookId, updateBookDto, currentUser._id.toString(), files.files);
  }


  @Put('borrowBook/:bookId')
  @UseGuards(new RolesGuard(['0','2'])) 
  @UseGuards(AuthGuardD)
    async borrowBook(
        @CurrentUser() currentUser: User,
        @Param('bookId') bookId: string,
        @Body('userId') userId: string
    )
    {
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
    
        console.log('Current User:', currentUser);
        console.log('role:',currentUser.role);
    
        return this.bookService.borrowBook(bookId, userId);
    }


    @Put('returnBook/:bookId')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async returnBook(
        @CurrentUser() currentUser: User,
        @Param('bookId') bookId: string,
        @Body('userId') userId: string
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        console.log('Current User:', currentUser);
        console.log('role:',currentUser.role);
    
        return this.bookService.returnBook(bookId, userId)
    }

    @Get('gethistory/:bookId')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async getHistory(
        @CurrentUser() currentUser: User,
        @Param('bookId') bookId: string
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        console.log('Current User:', currentUser);
        console.log('role:',currentUser.role);
    
        return this.bookService.getHistoryForBook(bookId)
    }

    @Get('getallbooks')
    @UseGuards(AuthGuardD)
    async getAllBooks(){
        return this.bookService.getAllBooks();
    }

    @Get('getbook/:bookId')
    @UseGuards(AuthGuardD)
    async getBook(
        @Param('bookId') bookId: string
    ){
        return this.bookService.getBookById(bookId);
    }

    @Get('getbookbyCategory/:category')
    @UseGuards(AuthGuardD)
    async getBookByCategory(
        @Param('category') category: string
    ){
        return this.bookService.getBooksByCategory(category);
    }
}
