import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class createCategoryDto {
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name is required' })
  readonly nameCate: string; //tên lọi nha shop
  
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  readonly decription: string; //mô tả nhá shop



}