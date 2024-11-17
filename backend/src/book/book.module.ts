import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schemas/book.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[
    CloudinaryModule,
    AuthModule,
  MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
