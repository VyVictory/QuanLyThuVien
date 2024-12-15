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
import { get } from 'http';
import { ObjectId } from 'mongoose';

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


  @Post('borrowBook/:bookId')
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
    async getAllBooks(){
        return this.bookService.getAllBooks();
    }

    @Get('getbook/:bookId')
    async getBook(
        @Param('bookId') bookId: string
    ){
        return this.bookService.getBookById(bookId);
    }

    @Get('getbookbyCategory/:category')
    async getBookByCategory(
        @Param('category') category: string
    ){
        return this.bookService.getBooksByCategory(category);
    }

    @Get('getbookbyTitle/:title')
    async getBookByTitle(
        @Param('title') title: string
    ){
        return this.bookService.findBookByTitle(title);
    }

    @Post('requestBorrow/:bookId')
    @UseGuards(AuthGuardD)
    async requestBorrow(
        @CurrentUser() currentUser: User,
        @Param('bookId') bookId: string,
        @Body('appointmentDate') appointmentDate: Date
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        
        return this.bookService.requestBorrowBook(bookId,currentUser._id.toString(),appointmentDate)
    }

    @Put('approveRequestBorrow/:requestId')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async approveRequestBorrow(
        @CurrentUser() currentUser: User,
        @Param('requestId') request: string,
        
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        
        return this.bookService.approveRequest(request)
    }

    @Put('rejectRequestBorrow/:requestId')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async rejectRequestBorrow(
        @CurrentUser() currentUser: User,
        @Param('requestId') request: string,
        @Body('notes') notes: string
        
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.rejectRequest(request,notes)
    }

    @Put('borrowRequestBorrow/:requestId')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async borrowRequestBorrow(
        @CurrentUser() currentUser: User,
        @Param('requestId') request: string,

    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.borrowBookWithRequest(request)
    }

    @Get('getAllRequests')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async getAllRequests(){
        return this.bookService.getRequestsForBook();
    }
    
    @Get('getMyHistoryBrrowed')
    @UseGuards(AuthGuardD)
    async getMyHistoryBrrowed(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyHistoryBrrowed(currentUser._id.toString())
    }

    @Get('getMyBrrowedoverdue')
    @UseGuards(AuthGuardD)
    async getMyBrrowedoverdue(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyBorrowedOverdue(currentUser._id.toString())
    }


    @Get('getMyBrrowedAreBrrowing')
    @UseGuards(AuthGuardD)
    async getMyBorrowedAreBrrowing(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyBorrowedAreBrrowing(currentUser._id.toString())
    }

    @Get('getMyBrrowed')
    @UseGuards(AuthGuardD)
    async getMyBrrowed(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyBorrowed(currentUser._id.toString())
    }

    @Get('getMyBorrowedReturned')
    @UseGuards(AuthGuardD)
    async getMyBorrowedReturned(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyBorrowedReturned(currentUser._id.toString())
    }

    @Get('getMyRequest')
    @UseGuards(AuthGuardD)
    async getMyRequest(
        @CurrentUser() currentUser: User
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.bookService.getMyRequests(currentUser._id.toString())
    }


}
