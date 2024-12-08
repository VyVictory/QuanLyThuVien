import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CurrentUser } from '../auth/decorator/current.user';
import { User } from '../auth/Schemas/user.schema';
import { RolesGuard } from '../auth/guard/role.guard';
import { AuthGuardD } from 'src/auth/guard/auth.guard';
import { createCategoryDto } from './dto/createCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private CategoryService: CategoryService,
    ) {}

    @Post('createCateogry')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async createCategory(
        @CurrentUser() currentUser: User,
        @Body() createCategoryDto: createCategoryDto,
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.CategoryService.createCategory(createCategoryDto, currentUser._id.toString());

    }

    @Get('getAllCategory')
    @UseGuards(AuthGuardD)
    async getAllCategory(){
        return this.CategoryService.getAllCategory();
    }

    @Put('updateCategory/:id')
    @UseGuards(new RolesGuard(['0','2']))
    @UseGuards(AuthGuardD)
    async updateCategory(
        @CurrentUser() currentUser: User,
        @Param('id') id: string,
        @Body() updateCategoryDto,
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }

        return this.CategoryService.updateCategory(updateCategoryDto,id);
    }
    
    @Get('getCategoryById/:id')
    @UseGuards(new RolesGuard(['0','2','1']))
    @UseGuards(AuthGuardD)
    async getCategoryId (
        @CurrentUser() currentUser: User,
        @Param('id') id: string,
    ){
        if (!currentUser) {
            throw new HttpException('User not found or not authenticated', HttpStatus.UNAUTHORIZED);
        }
        return this.CategoryService.getCategoryByid(id);
    }
    
}
