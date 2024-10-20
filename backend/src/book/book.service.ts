import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private BookModel: Model<Book>,
        private authService: AuthService,
        
        
      ) {}
    

      async createBook(){
        
      }
    
}
