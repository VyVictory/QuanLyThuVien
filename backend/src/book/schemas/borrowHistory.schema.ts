import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/auth/Schemas/user.schema';
import { Book } from './book.schema';


@Schema({
    timestamps: true
})

export class BorrowHistory extends Document {

  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Book;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Date, required: true })
  borrowDate: Date;

  @Prop({ type: Date, required: true })
  expectedReturn: Date;

  @Prop({ type: Date, default: null })
  returnDate: Date | null;

  @Prop({
    type: String,
    default: 'are borrowing',
    enum: ['are borrowing', 'returned', 'overdue'],
  })

  status: string;
}

export const BorrowHistorySchema = SchemaFactory.createForClass(BorrowHistory);
