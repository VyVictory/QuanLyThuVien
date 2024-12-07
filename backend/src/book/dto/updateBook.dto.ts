import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";



export class UpdateBookDto {
    @IsString()
    @IsOptional()
    readonly title: string;
  
    @IsString()
    @IsOptional()
    readonly author: string; // tác giả nhá shop

    @IsString()
    @IsOptional()
    publicationDate: string

    @IsString()
    @IsOptional()
    publisher: string

    @IsString()
    @IsOptional()
    language: string;

    @IsNumber()
    @IsOptional()
    pageCount: number;

    @IsString()
    @IsOptional()
    bookShelf: string;

    @IsString()
    @IsNotEmpty()
    UpdateBy: string
  
  }