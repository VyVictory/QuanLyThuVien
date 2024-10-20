import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { AuthService } from 'src/auth/auth.service';
import { CreateBookDto } from './dto/createBook.dto';
import { promises } from 'dns';
import { UpdateBookDto } from './dto/updateBook.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<Book>,
        private authService: AuthService,
        private jwtService: JwtService,
        private cloudinaryService: CloudinaryService,
      ) {}
    

      async createBook(createBookDto: CreateBookDto, userId: string, files?: Express.Multer.File[]): Promise<Book> {
        // Tạo đối tượng Book mới từ DTO
        const newBook = new this.BookModel({
            title: createBookDto.title,
            author: createBookDto.author,
            publicationDate: createBookDto.publicationDate,
            publisher: createBookDto.publisher,
            language: createBookDto.language,
            pageCount: createBookDto.pageCount,
            bookShelf: createBookDto.bookShelf,
            createby: userId, 
            available: true,
        });

        // Kiểm tra nếu có file hình ảnh để upload
        if (files && files.length > 0) {
            try {
                // Tải tất cả các hình ảnh lên Cloudinary
                const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
                newBook.img = uploadedImages; // Lưu đường dẫn secure_url vào thuộc tính img
            } catch (error) {
                console.error('Error uploading images to Cloudinary:', error);
                throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        // Lưu sách mới vào cơ sở dữ liệu
        return await newBook.save();
    }

    async updateBook(bookId: string, updateBookDto: UpdateBookDto, userId: string, files?: Express.Multer.File[]): Promise<Book> {
      // Tìm sách theo ID
      const book = await this.BookModel.findById(bookId);
      if (!book) {
          throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
  
      // Cập nhật các thông tin sách từ DTO
      Object.assign(book, updateBookDto);
  
      // Kiểm tra nếu có file hình ảnh để upload
      if (files && files.length > 0) {
          try {
              // Tải tất cả các hình ảnh lên Cloudinary
              const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
              book.img = uploadedImages; // Lưu đường dẫn secure_url vào thuộc tính img
          } catch (error) {
              console.error('Error uploading images to Cloudinary:', error);
              throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
          }
      }
  
      // Lưu sách đã cập nhật vào cơ sở dữ liệu
      return await book.save();
  }
  

    
}
