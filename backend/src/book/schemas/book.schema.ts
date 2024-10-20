import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

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

  @Prop()
  category: string // nối tới schema category

  @Prop()
  author: string

  @Prop()
  publicationDate: string;

  @Prop()
  publisher: string;

  @Prop()
  language: string;
 
  @Prop()
  pageCount: number;

  @Prop()
  bookShelf: string

  @Prop({ default: true })
  available: boolean; 

  @Prop({type: Types.ObjectId, ref:'user'})
  createby:Types.ObjectId

}

export const BookSchema = SchemaFactory.createForClass(Book);
