import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';


@Schema({
  timestamps: true,
})
export class RequestBrrowBook extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
    book: Types.ObjectId;

    @Prop({ required: true })
    requestedDate: Date;

    @Prop({ required: true })
    status: 'pending' | 'approved' | 'rejected' | 'borrowed' |'unsuccessful' ;

    @Prop({ default: "" })
    responseDate: Date;

    @Prop({ required: true })
    appointmentDate : Date;
  
    @Prop({ default: null })
    notes: string;


}

export const RequestBrrowBookSchema = SchemaFactory.createForClass(RequestBrrowBook);