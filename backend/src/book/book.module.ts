import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from '../category/schema/category.schema';
import { CategoryModule } from 'src/category/category.module';
import { RequestBrrowBookSchema } from './schemas/requestBrrowBook.schema';
import { ScheduleModule } from '@nestjs/schedule';
import { BorrowHistorySchema } from './schemas/BorrowHistory.schema';


@Module({
  imports:[
    CloudinaryModule,
    AuthModule,
  CategoryModule,
  MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  MongooseModule.forFeature([{ name: 'RequestBrrowBook', schema: RequestBrrowBookSchema }]),
  MongooseModule.forFeature([{ name: 'BorrowHistory', schema: BorrowHistorySchema}]),
  ScheduleModule.forRoot()
],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
