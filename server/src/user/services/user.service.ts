import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(payload: { name: string; email: string; password: string }) {
    const { name, email, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  async findOne(filterExpression: FilterQuery<User>) {
    return this.userModel.findOne(filterExpression);
  }
}
