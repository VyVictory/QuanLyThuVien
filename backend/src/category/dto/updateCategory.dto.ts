import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class UpdateCategoryCategoryDto {
    @IsString()
    @IsNotEmpty()
    readonly nameCate: string; //tên lọi nha shop
  
    @IsString()
    @IsNotEmpty()
    readonly decription: string; //mô tả nhá shop


  }