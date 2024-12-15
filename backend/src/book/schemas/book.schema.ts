import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/auth/Schemas/user.schema';
import { Category } from 'src/category/schema/category.schema';

@Schema({
  timestamps: true,
})
export class Book extends Document {
  @Prop({
    unique: [
      true,
      'The title already exists',
    ],
  })
  title: string;

  @Prop({  
    type: Types.ObjectId, ref: 'Category' })
    category: Category; 

  @Prop()
  author: string;
  
  @Prop()
  publicationDate: string;

  @Prop()
  publisher: string;

  @Prop()
  language: string;
 
  @Prop()
  pageCount: number;

  @Prop()
  bookShelf: string;

  @Prop({ default: true })
  available: boolean; 

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createby: User;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  UpdateBy: User;

  @Prop({ type: [String], default: [] }) 
  img: string[];

  @Prop({ default: 1 })
  copies: number;

  @Prop({ default: 0 })
  borrowedCopies: number;


}
export const BookSchema = SchemaFactory.createForClass(Book);


  // @Prop({
  //   type: [
  //     {
  //       userId: { type: Types.ObjectId, ref: 'User' }, 
  //       borrowDate: { type: Date, required: true },
  //       ExpectedReturn: { type: Date, required: true },
  //       returnDate: { type: Date, default: null },
  //       status: { type: String,
  //          default: 'are borrowing',
  //          enum: ['are borrowing', 'returned', 'overdue'],
  //         },
  //     },
  //   ],
  //   default: [],
  // })
  // borrowHistory: {
  //   userId: Types.ObjectId;
  //   borrowDate: Date;
  //   ExpectedReturn: Date;
  //   status: string;
  //   returnDate: Date | null;
  // }[];
  


