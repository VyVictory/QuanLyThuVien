import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { User } from '../auth/Schemas/user.schema';
import { createCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private CategoryModel: Model<Category>, 
        @InjectModel(User.name) private UserModel: Model<User>,
    ) {}


    async createCategory(createCategoryDto: createCategoryDto, createBy: string): Promise<Category> {
        const { nameCate } = createCategoryDto;
        console.log('nameCate from DTO:', nameCate);
    
        const checkCategory = await this.CategoryModel.findOne({ nameCate });
        console.log('checkCateogy:',checkCategory);

        if (checkCategory) {
            throw new HttpException(
                'The category already exists',
                HttpStatus.CONFLICT,
            );
        }

        const newCategory = new this.CategoryModel({
            ...createCategoryDto,
            createBy,
        });  
        return await newCategory.save(); 
    }
    

    async getAllCategory(): Promise<Category[]> {
        return await this.CategoryModel.find();
    }

    async updateCategory( updateCategoryDto : UpdateCategoryCategoryDto ,id: string): Promise<Category> {
        const category = await this.CategoryModel.findByIdAndUpdate(id,
            updateCategoryDto,
            {new: true}
        )
        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
        

        return category;
    }

    


}
