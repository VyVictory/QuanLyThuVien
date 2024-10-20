import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    unique: [
      true,
      'The phone number has been created, please try with another number',
    ],
  })
  numberPhone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  gender: string; //true is male, false is female

  @Prop()
  birthday: string;

  @Prop()
  avatar: string;

  @Prop()
  basketBook: string;

  @Prop({ default: 0 })
  role: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  refreshToken?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
