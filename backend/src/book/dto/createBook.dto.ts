import { IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;
  
    @IsString()
    @IsNotEmpty()
    readonly author: string; // tác giả nhá shop

    @IsString()
    @IsNotEmpty()
    readonly Category: string; // thể loại

    @IsString()
    @IsNotEmpty()
    publicationDate: string

    @IsString()
    @IsNotEmpty()
    publisher: string

    @IsString()
    @IsNotEmpty()
    language: string;

    @IsNumber()
    @IsNotEmpty()
    pageCount: number;

    @IsString()
    @IsNotEmpty()
    bookShelf: string;

    @IsNotEmpty()
    @IsString()
    readonly img?:string[]

    @IsNumber()
    @IsNotEmpty()
    copies: number; // tổng xách

  }