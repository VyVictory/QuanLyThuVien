import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { User } from 'src/auth/Schemas/user.schema';
import { Book } from './book.schema';


@Schema({
  timestamps: true,
})
export class RequestBrrowBook extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
    book: Book;

    @Prop({ required: true })
    requestedDate: Date;

    @Prop({ required: true })
    status: 'pending' | 'approved' | 'rejected' | 'borrowed' |'unsuccessful'  |'return' ;

    @Prop({ default: "" })
    responseDate: Date;

    @Prop({ required: true })
    appointmentDate : Date;
  
    @Prop({ default: null })
    notes: string;


}

export const RequestBrrowBookSchema = SchemaFactory.createForClass(RequestBrrowBook);