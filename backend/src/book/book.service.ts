import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from './schemas/book.schema';
import { AuthService } from 'src/auth/auth.service';
import { CreateBookDto } from './dto/createBook.dto';
import { promises } from 'dns';
import { UpdateBookDto } from './dto/updateBook.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/auth/Schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<Book>,
        @InjectModel(User.name) private UserModel: Model<User>,
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

        const book = await this.BookModel.findById(bookId);
        if (!book) {
          throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }
      

        Object.assign(book, updateBookDto);

        if (files && files.length > 0) {
          try {

            const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
            book.img = uploadedImages;
          } catch (error) {
            console.error('Error uploading images to Cloudinary:', error);
            throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      
        const userIdOBJ = new Types.ObjectId(userId);
        book.UpdateBy = userIdOBJ
      
        return await book.save();
      }

  async borrowBook(bookId: string, userId: string): Promise<Book> {
    // Tìm sách theo ID
    const book = await this.BookModel.findById(bookId);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    if (book.copies <= book.borrowedCopies) {
      throw new HttpException('No copies available to borrow', HttpStatus.BAD_REQUEST);
    }

    book.borrowedCopies += 1;
    const userIdOBJ = new Types.ObjectId(userId);
    
    book.borrowHistory.push({
      userId: userIdOBJ,
      borrowDate: new Date(),
      returnDate: null, 
    });
    return await book.save();
  }


  async returnBook(bookId: string, userId: string): Promise<Book> {
    // Tìm sách theo ID
    const book = await this.BookModel.findById(bookId);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }

    // Chuyển đổi userId từ string sang ObjectId
    const userObjectId = new Types.ObjectId(userId);

    // Tìm lịch sử mượn sách của người dùng
    const borrowRecord = book.borrowHistory.find(record => record.userId.equals(userObjectId) && !record.returnDate);
    if (!borrowRecord) {
      throw new HttpException('Borrow record not found', HttpStatus.NOT_FOUND);
    }

    // Cập nhật ngày trả sách
    borrowRecord.returnDate = new Date();

    // Cập nhật số lượng sách đã mượn
    book.borrowedCopies -= 1;

    // Lưu sách đã cập nhật vào cơ sở dữ liệu
    return await book.save();
  }
  

    
}
