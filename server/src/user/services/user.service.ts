import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(payload: { name: string; email: string; password: string }) {
    const { name, email, password } = payload;

    const isEmailTaken = await this.exists({ email });

    if (isEmailTaken) {
      throw new BadRequestException(
        'An account with this email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  findOne(filterExpression: FilterQuery<User>) {
    return this.userModel.findOne(filterExpression);
  }
  exists(filterExpression: FilterQuery<User>) {
    return this.userModel.exists(filterExpression);
  }
}
