import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
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
        const existingBook = await this.BookModel.findOne({ title: createBookDto.title });
        if (existingBook) {
            throw new HttpException('Book with this title already exists', HttpStatus.CONFLICT);
        }
    
        const newBook = new this.BookModel({
            ...createBookDto,
            category: createBookDto.Category,
            createby: userId,
            available: true,
            copies: createBookDto.copies || 1,
            borrowedCopies: 0,
            borrowHistory: [],
        });
    
        // Kiểm tra xem category có được gán đúng vào newBook không
        if (!newBook.category) {
            console.log('The category add failed:', newBook.category);
            throw new HttpException('Category ID is missing or invalid', HttpStatus.BAD_REQUEST);
        }
    
        if (files && files.length > 0) {
            try {
                const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadFile(file)));
                newBook.img = uploadedImages;
            } catch (error) {
                console.error('Error uploading images to Cloudinary:', error);
                throw new HttpException('Failed to upload images', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    
        console.log(newBook);
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


  async getHistoryForBook(bookId: string) {
    // Tìm cuốn sách theo bookId
    const book = await this.BookModel.findById(bookId);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
  
    // Lấy danh sách lịch sử mượn sách
    const borrowHistory = book.borrowHistory;
  
    // Kiểm tra nếu lịch sử mượn sách không tồn tại
    if (!borrowHistory || borrowHistory.length === 0) {
      throw new HttpException('No borrow history found for this book', HttpStatus.NOT_FOUND);
    }
  
    // Lấy thông tin chi tiết của từng người dùng từ lịch sử mượn sách
    const detailedHistory = await Promise.all(
      borrowHistory.map(async (history) => {
        const user = await this.UserModel.findById(history.userId);
        if (!user) {
          throw new HttpException(`User not found for userId: ${history.userId}`, HttpStatus.NOT_FOUND);
        }
  
        return {
          userName: user.firstName + ' ' +   user.lastName ,
          borrowedAt: history.borrowDate, 
          returnedAt: history.returnDate,
        };
      })
    );
  
    return detailedHistory;
  }

  async getBookById(bookId: string): Promise<Book> {
    const book = await this.BookModel.findById(bookId)
    .populate('category', '_id nameCate')
    .populate('createby', '_id firstName lastName')
    .exec();
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async getAllBooks(): Promise<Book[]> {
    return await this.BookModel.find();
  }

  async getBooksByCategory(categoryId: string): Promise<Book[]> {
    if (!isValidObjectId(categoryId)) {
        throw new HttpException('Invalid category ID', HttpStatus.BAD_REQUEST);
    }

    const books = await this.BookModel.find({ category: categoryId })
        .populate('category', '_id nameCate') // Lấy thông tin từ collection Category
        .populate('', '_id firstName lastName')
        .populate({
          path: 'borrowHistory.userId', 
          select: 'firstName lastName', 
      })
      .exec();

    if (!books || books.length === 0) {
        throw new HttpException('No books found for this category', HttpStatus.NOT_FOUND);
    }

    return books;
}

  

    
}
