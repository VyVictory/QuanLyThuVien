import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category extends Document {

  @Prop({
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true, // Xóa khoảng trắng thừa
})
  nameCate: string;

  @Prop()
  decription: string;

//   @Prop({ type: Types.ObjectId, ref: 'category' })
//   parentCategoryId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createby: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  UpdateBy: Types.ObjectId;


}

export const CategorySchema = SchemaFactory.createForClass(Category);