import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './Schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private jwtService: JwtService,
        private configService: ConfigService,
      ) {}
    
      async register(registerDto: RegisterDto): Promise<User> {
        const {
          numberPhone,
          email,
          firstName,
          lastName,
          address,
          gender,
          birthday,
          password,
        } = registerDto;
    
        const checkUSer = await this.UserModel.findOne({ numberPhone });
        if (checkUSer) {
          throw new HttpException(
            'the numberphone has account:(',
            HttpStatus.CONFLICT,
          );
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
    
        const user = await this.UserModel.create({
          numberPhone,
          email,
          firstName,
          lastName,
          address,
          gender,
          birthday,
          password: hashPassword,
        });
        return user;
      }
    
      async generateToken(userId): Promise<{ accessToken: string, refreshToken:string }> {
        const accessToken = this.jwtService.sign({ userId });
        
        const refreshToken = this.jwtService.sign(
          { userId }, 
          { 
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'), 
            expiresIn: this.configService.get<string | number>('JWT_REFRESH_EXPIRES') 
          } 
        );
        await this.UserModel.findByIdAndUpdate(userId, { refreshToken });
        return {
          accessToken,
          refreshToken
        };
      }
    
      async refreshToken(userId: string, refreshToken: string): Promise<{ accessToken: string }> {
        const user = await this.UserModel.findById(userId);
        
        // Kiểm tra xem người dùng có tồn tại và refresh token có hợp lệ không
        if (!user || user.refreshToken !== refreshToken) {
          throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
      
        // Xác thực refresh token bằng secret cho refresh token
        try {
          this.jwtService.verify(refreshToken, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'), // Sử dụng secret cho refresh token từ config
          });
        } catch (error) {
          throw new HttpException('Refresh token expired', HttpStatus.UNAUTHORIZED);
        }
      
        // Tạo mới access token (không cần truyền secret và expiresIn vì đã cấu hình trong module)
        const accessToken = this.jwtService.sign({ userId });
      
        return { accessToken };
      }
      
    
      async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { numberPhone, email, password } = loginDto;
    
        // Tìm người dùng bằng email hoặc số điện thoại
        const user = await this.UserModel.findOne({
          $or: [
            { numberPhone }, // Tìm theo số điện thoại
            { email }, // Tìm theo email
          ],
        });
    
        // Nếu người dùng không tồn tại
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        // Kiểm tra mật khẩu
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }
    
        // Trả về token nếu đăng nhập thành công
        return this.generateToken(user._id);
      }
    
    
      async findById(userId: string): Promise<Omit<User, 'password' | 'isActive' | 'role' | 'createdAt' | 'updatedAt'>> {
        const user = await this.UserModel.findById(userId)
          .select('-password -isActive -role -createdAt -updatedAt') // Không trả về các trường này
          .exec();
      
        if (!user) {
          throw new NotFoundException('404: user not found');
        }
      
        return user;
      }
       
      async updateUser(userId: string, updateData: any): Promise<any> {
        // Tìm người dùng theo ID
        const user = await this.UserModel.findById(userId);
      
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      
        // Loại bỏ các trường không được phép cập nhật như role, isActive, refreshToken
        const restrictedFields = ['role', 'isActive', 'refreshToken'];
        restrictedFields.forEach(field => {
          if (field in updateData) {
            delete updateData[field];
          }
        });
      
        // Cập nhật thông tin người dùng
        Object.assign(user, updateData);
      
        // Lưu thay đổi vào cơ sở dữ liệu
        await user.save();
      
        // Tạo đối tượng chỉ chứa các trường đã được cập nhật
        const updatedFields = Object.keys(updateData).reduce((acc, key) => {
          acc[key] = user[key]; // Lấy giá trị từ user sau khi cập nhật
          return acc;
        }, {});
      
        return updatedFields; // Trả về chỉ các trường đã được cập nhật
      }
      
    
      async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
        const { currentPassword, newPassword } = changePasswordDto;
    
        try {
            // Find user by ID
            const user = await this.UserModel.findById(userId);
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
    
            // Check current password
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                throw new HttpException('Current password is incorrect', HttpStatus.UNAUTHORIZED);
            }
    
            // Check if new password is the same as the current password
            const isNewPasswordSameAsCurrent = await bcrypt.compare(newPassword, user.password);
            if (isNewPasswordSameAsCurrent) {
                throw new HttpException('New password cannot be the same as the current password', HttpStatus.BAD_REQUEST);
            }
    
            // Hash the new password
            user.password = await bcrypt.hash(newPassword, 10);
    
            // Save changes to the database
            await user.save();
    
            return { message: 'Password updated successfully' };
        } catch (error) {
            // Handle error and return a message without logging it
            if (error instanceof HttpException) {
                throw error; // If error is an HttpException, rethrow it
            }
    
            // For any unexpected errors, return a generic message
            throw new HttpException('Password update failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
      
    
}
    

