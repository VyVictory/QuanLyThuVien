import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, ObjectId, Types } from 'mongoose';
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
import { BorrowHistory } from './schemas/BorrowHistory.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<Book>,
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel('RequestBrrowBook') private RequestBrrowBookModel: Model<RequestBrrowBook>,
        @InjectModel('BorrowHistory') private BorrowHistoryModel: Model<BorrowHistory>,
        private authService: AuthService,
        private jwtService: JwtService,
        private cloudinaryService: CloudinaryService,
      ) {}


      @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
      async updateBookStatus() {
        const currentDate = new Date();
      
        // Lấy tất cả các bản ghi mượn sách với trạng thái 'are borrowing' và quá hạn
        const overdueBorrows = await this.BorrowHistoryModel.find({
          status: 'are borrowing',
          ExpectedReturn: { $lt: currentDate }, // Ngày trả dự kiến nhỏ hơn ngày hiện tại
          returnDate: null, // Chưa được trả
        });
      
        if (overdueBorrows.length === 0) {
          console.log('No overdue books found.');
          return;
        }
      
        // Cập nhật trạng thái 'overdue' cho tất cả các bản ghi quá hạn
        for (const borrow of overdueBorrows) {
          borrow.status = 'overdue';
          await borrow.save(); // Lưu thay đổi
        }
      
        console.log(`Updated status to 'overdue' for ${overdueBorrows.length} borrow records.`);
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
        
        const updateBy = await this.UserModel.findById(updateBookDto.UpdateBy);
        
        book.UpdateBy = updateBy
      
        return await book.save();
      }


      
      async borrowBook(bookId: string, userId: string): Promise<BorrowHistory> { //đẫ test
        const book = await this.BookModel.findById(bookId);
        if (!book) {
          throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }
      
        // Bước 2: Kiểm tra số lượng bản sao còn lại
        if (book.copies <= book.borrowedCopies) {
          throw new HttpException('No copies available to borrow', HttpStatus.BAD_REQUEST);
        }
      
        // Bước 3: Tăng số lượng sách đã mượn
        book.borrowedCopies += 1;
        await book.save();

        const borrowDate = new Date();
        const expectedReturnDate = new Date(borrowDate.getTime() + 14 * 24 * 60 * 60 * 1000);
      
        const borrowHistory = new this.BorrowHistoryModel({
          bookId: new Types.ObjectId(bookId),
          userId: new Types.ObjectId(userId),
          borrowDate: borrowDate,
          expectedReturn: expectedReturnDate,
          status: 'are borrowing',
          returnDate: null,
        });
      
        return await borrowHistory.save(); 
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


  async borrowBookWithRequest(requestId: string): Promise<BorrowHistory> {
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


  async returnBook(bookId: string, userId: string): Promise<void> {
    // Tìm lịch sử mượn sách của người dùng theo bookId và userId
    const borrowRecord = await this.BorrowHistoryModel.findOne({
      book: new Types.ObjectId(bookId),
      userId: new Types.ObjectId(userId),
      returnDate: null, // Chỉ lấy bản ghi chưa trả sách
    });
  
    if (!borrowRecord) {
      throw new HttpException('Borrow record not found', HttpStatus.NOT_FOUND);
    }
  
    // Cập nhật ngày trả sách và trạng thái
    borrowRecord.returnDate = new Date();
    borrowRecord.status = 'returned';
  
    // Lưu bản ghi đã cập nhật vào cơ sở dữ liệu
    await borrowRecord.save();
  
    // Giảm số lượng sách đang được mượn
    await this.BookModel.findByIdAndUpdate(
      bookId,
      { $inc: { borrowedCopies: -1 } }, // Giảm borrowedCopies đi 1
      { new: true }
    );
  
    console.log(`Book ${bookId} has been returned by user ${userId}`);
  }
  


  async getHistoryForBook(book_id: string): Promise<any[]> {
    //logic : đầu tiên kiểm tra sách có tồn tại 0
    //nếu có tồn tại tiếp theo đem _id sách qua model BrrowHistoryModel để tìm lịch sử mượn sách
    //sau đó kiểm tra với id sách đó thì sách có tồn tại trong bảng BrrowHistoryModel không (chỗ này đang lỗi)

    // => đã fix lý do không lấy được thông tin sách trong dựa vào book_id vì
    //    trong csdl đã đế nó ref đến bảng book bằng OBJECTID nhưng trong service không đổi kiểu lại

    //nếu có thì bắt lại những document có id sách đó
    // và dùng populate để lấy các thông tin sau 
    // đầu tiên là bookId để lấy thông tin sách
    // tiếp theo là userId để lấy thông tin người mượn
    // cuối cùng là trả về thông tin

    const swagerTypeBookid = new Types.ObjectId(book_id);

    const book = await this.BookModel.findById(swagerTypeBookid);
    console.log('book of findbyid',book);
    if(!book){
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    const historyBrrowed = await this.BorrowHistoryModel.find({ bookId: swagerTypeBookid })
    .populate('userId', 'firstName lastName')
    .exec();
    

    console.log('function find Brrowed for book', historyBrrowed);
    if(historyBrrowed.length === 0){
      throw new HttpException('History borrowed not found', HttpStatus.NOT_FOUND);
    }

    const history = historyBrrowed.map((borrowHistory) => ({
      
      title: book.title,
      // user : borrowHistory.userId.firstName + ' ' + borrowHistory.userId.lastName,
      borrowDate: borrowHistory.borrowDate,
      expectedReturn: borrowHistory.expectedReturn,
      returnDate: borrowHistory.returnDate,
      status: borrowHistory.status,
    }));
    return history;


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
  
    // Truy vấn sách và sử dụng populate lồng ghép
    const books = await this.BookModel.find({ category: categoryId })
      .populate([
        { path: 'category', select: '_id nameCate' }, // Lấy thông tin từ collection Category
        { path: 'createby', select: '_id firstName lastName' }, // Lấy thông tin từ collection User
        {
          path: 'borrowHistory',
          populate: {
            path: 'userId',
            select: 'firstName lastName', // Lấy thông tin người mượn
          },
        },
      ])
      .exec();
  
    // Kiểm tra nếu không có sách
    if (!books || books.length === 0) {
      throw new HttpException('No books found for this category', HttpStatus.NOT_FOUND);
    }
  
    return books;
  }
  

  async getMyHistoryBrrowed(userId: string): Promise<any[]> {
    const userObjectId = new Types.ObjectId(userId);
  
    // Truy vấn lịch sử mượn sách của người dùng
    const borrowHistories = await this.BorrowHistoryModel.find({
      userId: userObjectId,
    })
      .populate({
        path: 'bookId',  // Lấy thông tin sách từ collection Book
        select: 'title',  // Chỉ lấy trường title
      })
      .exec();
  
    if (!borrowHistories || borrowHistories.length === 0) {
      throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
    }
    const bookTitle = await this.BookModel.findById(borrowHistories[0].bookId).select('title').exec();
    // Lấy danh sách thông tin mượn
    const history = borrowHistories.map((borrowHistory) => ({
      title:bookTitle,
      borrowDate: borrowHistory.borrowDate,
      returnDate: borrowHistory.returnDate,
      status: borrowHistory.status,
    }));
  
    return history;
  }
  
  
  
  
  

  async getMyBorrowedOverdue(userId: string): Promise<any[]> {
    const userObjectId = new Types.ObjectId(userId);
  
   
    const overdueHistory = await this.BorrowHistoryModel.find({
      userId: userObjectId,
      status: 'overdue',
    })
      .populate({
        path: 'bookId', // Truy vấn thông tin sách từ collection Book
        select: 'title', // Lấy trường title từ Book
      })
      .exec();
  
    // Kiểm tra nếu không có lịch sử quá hạn
    if (!overdueHistory || overdueHistory.length === 0) {
      throw new HttpException('No overdue borrow history found for this user', HttpStatus.NOT_FOUND);
    }
  
    const bookTitle = await this.BookModel.findById(BorrowHistory[0].bookId).select('title').exec();

    const overdueBooks = overdueHistory.map((history) => ({
      title: bookTitle,
      borrowDate: history.borrowDate,
      expectedReturn: history.expectedReturn,
      returnDate: history.returnDate,
      status: history.status,
    }));
  
    return overdueBooks;
  }
  
  
  

  async getMyBorrowed(userId: string): Promise<any[]> {
    const userObjectId = new Types.ObjectId(userId);
  
    // Truy vấn tất cả các sách mà user đã mượn
    const borrowedHistory = await this.BorrowHistoryModel.find({
      userId: userObjectId,
      status: 'are borrowing', 
    })
      .populate({
        path: 'bookId', 
        select: 'title',
      })
      .exec();
  
    if (!borrowedHistory || borrowedHistory.length === 0) {
      throw new HttpException('No borrow history found for this user', HttpStatus.NOT_FOUND);
    }
    const bookTitle = await this.BookModel.findById(BorrowHistory[0].bookId).select('title').exec();

    const borrowedBooks = borrowedHistory.map((history) => ({
      title: bookTitle,
      borrowDate: history.borrowDate,
      expectedReturn: history.expectedReturn,
      returnDate: history.returnDate,
      status: history.status,
    }));
  
    return borrowedBooks;
  }
  
  

  async getMyBorrowedReturned(userId: string): Promise<any[]> {
    const userObjectId = new Types.ObjectId(userId);
  
    // Truy vấn tất cả các sách mà user đã mượn và có trạng thái trả lại
    const borrowedHistory = await this.BorrowHistoryModel.find({
      userId: userObjectId,
      status: 'returned',
    })
      .populate({
        path: 'bookId', // Truy vấn thông tin sách từ collection Book
        select: 'title', // Lấy trường title từ Book
      })
      .exec();
  
    if (!borrowedHistory || borrowedHistory.length === 0) {
      throw new HttpException('No returned borrow history found for this user', HttpStatus.NOT_FOUND);
    }
  
    const bookTitle = await this.BookModel.findById(BorrowHistory[0].bookId).select('title').exec();

    const returnedBooks = borrowedHistory.map((history) => ({
      title: bookTitle,
      borrowDate: history.borrowDate,
      returnedDate: history.returnDate,
      status: history.status,
    }));
  
    return returnedBooks;
  }
  

  async getMyRequests(userId: string): Promise<RequestBrrowBook[]> {
    const userObjectId = new Types.ObjectId(userId);
    return await this.RequestBrrowBookModel.find({ user: userObjectId });
  }
    
}
