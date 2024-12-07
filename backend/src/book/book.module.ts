import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthModule } from '../auth/auth.module';
import { Category } from '../category/schema/category.schema';
import { CategoryModule } from 'src/category/category.module';


@Module({
  imports:[
    CloudinaryModule,
    AuthModule,
  CategoryModule,
  MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
