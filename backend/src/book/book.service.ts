import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { Book } from './schemas/book.schema';
import { AuthService } from '../auth/auth.service';
import { CreateBookDto } from './dto/createBook.dto';
import { promises } from 'dns';
import { UpdateBookDto } from './dto/updateBook.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '../auth/Schemas/user.schema';
import { RequestBrrowBook } from './schemas/requestBrrowBook.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<Book>,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel('RequestBrrowBook') private RequestBrrowBookModel: Model<RequestBrrowBook>,
        private authService: AuthService,
        private jwtService: JwtService,
        private cloudinaryService: CloudinaryService,
      ) {}


      @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
      async updateBookStatus() {
        const currentDate = new Date();

        const books = await this.BookModel.find({ 'borrowHistory.status': 'are borrowing'});
        for (const book of books) {
          // Kiểm tra từng bản ghi mượn sách
          for (const borrow of book.borrowHistory) {
            if (
              borrow.status === 'are borrowing' && // Trạng thái mượn sách
              borrow.ExpectedReturn < currentDate && // Ngày trả dự kiến đã qua
              !borrow.returnDate // Chưa có ngày trả
            ) {
              // Cập nhật trạng thái thành 'overdue' nếu quá hạn
              borrow.status = 'overdue';
            }
          }
    
          // Lưu lại sách sau khi cập nhật trạng thái
          await book.save();
        }
    
        console.log('Checked for overdue books and updated statuses.');
      }
      
    

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
    const book = await this.BookModel.findById(bookId);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    if (book.copies <= book.borrowedCopies) {
      throw new HttpException('No copies available to borrow', HttpStatus.BAD_REQUEST);
    }
    book.borrowedCopies += 1;
    const userIdOBJ = new Types.ObjectId(userId);
    const borrowDate = new Date();
    const ExpectedReturn = new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    book.borrowHistory.push({
      userId: userIdOBJ,
      borrowDate: new Date(),
      ExpectedReturn : ExpectedReturn,
      status: 'are borrowing',
      returnDate: null, 
    });
    return await book.save();
  }

    async requestBorrowBook(bookId: string, userId: string, appointmentDate: Date): Promise<RequestBrrowBook>{

      const book = await this.BookModel.findById(bookId);
      if (!book) {
        console.log(bookId);
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      const user = await this.UserModel.findById(userId);
      if(!user){
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const currentDate = new Date();
      const maxDate = new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000);

      if (new Date(appointmentDate) > maxDate) {
        throw new HttpException('Appointment date cannot be more than 4 days from today', HttpStatus.BAD_REQUEST);
      }

      
      const request = await this.RequestBrrowBookModel.create({
        user: userId,
        book: bookId,
        requestedDate: new Date(),
        appointmentDate : maxDate,
        status: 'pending',
      });

      return request;
  }

  async approveRequest(requestId: string,): Promise<RequestBrrowBook> {
    const request = await this.RequestBrrowBookModel.findById(requestId);
    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }

    if (request.status !== 'pending') {
      throw new HttpException('Request has already been processed', HttpStatus.BAD_REQUEST);
    }
    
    request.status = 'approved';
    request.responseDate = new Date();
    return await request.save();
  }

  async rejectRequest(requestId: string, notes: string): Promise<RequestBrrowBook> {
    const request = await this.RequestBrrowBookModel.findById(requestId);
    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
    if (request.status !== 'pending') {
      throw new HttpException('Request has already been processed', HttpStatus.BAD_REQUEST);
    }
    request.status = 'rejected';
    request.responseDate = new Date();
    request.notes = notes;
    return await request.save();
  }

  async borrowBookWithRequest(requestId: string): Promise<Book> {
    const request = await this.RequestBrrowBookModel.findById(requestId);
    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
  
    if (request.status !== 'approved') {
      throw new HttpException('Request has not been approved', HttpStatus.BAD_REQUEST);
    }
  
    // Gọi hàm borrowBook để xử lý việc mượn sách
    const borrowedBook = await this.borrowBook(request.book.toString(), request.user.toString());
  
    // Cập nhật trạng thái của request thành "borrowed"
    request.status = 'borrowed';
    request.responseDate = new Date();
    await request.save();
  
    
    return borrowedBook;
  }
  
  async getRequestsForBook(): Promise<RequestBrrowBook[]> {
    const requests = await this.RequestBrrowBookModel.find()
    return requests
  }

  // async requestBorrowBook(bookId: string, userId: string): Promise<Book> {
  //   // Tìm sách theo ID
  //   const book = await this.BookModel.findById(bookId);
  //   if (!book) {
  //     throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
  //   }

  //   if (book.copies <= book.borrowedCopies) {
  //     throw new HttpException('No copies available to borrow', HttpStatus.BAD_REQUEST);
  //   }

  //   return await book.save();
  // }


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
    .populate('category', '_id nameCate')  // Lấy thông tin từ collection Category
    .populate('createby', '_id firstName lastName')  // Lấy thông tin từ collection User
    .exec();
  
  for (const book of books) {
    if (book.borrowHistory && book.borrowHistory.length > 0) {
      await book.populate('borrowHistory.userId', 'firstName lastName');
    }
  }

    if (!books || books.length === 0) {
        throw new HttpException('No books found for this category', HttpStatus.NOT_FOUND);
    }

    return books;
}

  async getMyHistoryBrrowed(userId: string): Promise<any[]> {

    const userObjectId = new Types.ObjectId(userId);

    const books = await this.BookModel.find({
        'borrowHistory.userId': userObjectId,
    }).select('title borrowHistory');

    if (!books || books.length === 0) {
        throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
    }

    const history = books.map((book) => ({
        title: book.title,
        borrowHistory: book.borrowHistory.filter(
            (record) => record.userId.toString() === userId
        ),
    }));

    return history;
  }

  async getMyBorrowedOverdue(userId: string): Promise<any[]> {
    const userObjectId = new Types.ObjectId(userId);

    // Lấy tất cả các sách mà user đã mượn
    const books = await this.BookModel.find({
        'borrowHistory.userId': userObjectId,
    });

    if (!books || books.length === 0) {
        throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
    }

    // Lọc danh sách sách có bản ghi overdue
    const overdueBooks = books
        .map((book) => ({
            title: book.title,
            overdueHistory: book.borrowHistory.filter(
                (record) =>
                    record.userId.toString() === userId && record.status === 'overdue'
            ),
        }))
        .filter((entry) => entry.overdueHistory.length > 0); // Chỉ giữ lại sách có lịch sử overdue

    return overdueBooks;
}

    async getMyBorrowed(userId: string): Promise<any[]> {
      const userObjectId = new Types.ObjectId(userId);

      // Lấy tất cả các sách mà user đã mượn
      const books = await this.BookModel.find({
          'borrowHistory.userId': userObjectId,
      });

      if (!books || books.length === 0) {
          throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
      }

      // Lọc danh sách sách có bản ghi đang mượn
      const borrowedBooks = books
          .map((book) => ({
              title: book.title,
              borrowedHistory: book.borrowHistory.filter(
                  (record) =>
                      record.userId.toString() === userId && record.status === 'are borrowing'
              ),
          }))
          .filter((entry) => entry.borrowedHistory.length > 0); // Chỉ giữ lại sách có lịch sử đang mượn

      return borrowedBooks;

    }

    async getMyBorrowedReturned(userId: string): Promise<any[]> {
      const userObjectId = new Types.ObjectId(userId);

      // Lấy tất cả các sách mà user đã mượn
      const books = await this.BookModel.find({
          'borrowHistory.userId': userObjectId,
      });

      if (!books || books.length === 0) {
          throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
      }

      // Lọc danh sách sách có bản ghi đã trả
      const returnedBooks = books
          .map((book) => ({
              title: book.title,
              returnedHistory: book.borrowHistory.filter(
                  (record) =>
                      record.userId.toString() === userId && record.status === 'returned'
              ),
          }))
          .filter((entry) => entry.returnedHistory.length > 0); // Chỉ giữ lại sách có lịch sử đã trả

      return returnedBooks;
    }

  async getMyRequests(userId: string): Promise<RequestBrrowBook[]> {
    const userObjectId = new Types.ObjectId(userId);
    return await this.RequestBrrowBookModel.find({ user: userObjectId });
  }
    
}
