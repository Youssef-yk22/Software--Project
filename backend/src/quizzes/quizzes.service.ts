import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz, QuizDocument } from './models/quizzes.schema';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<QuizDocument>) {}

  async create(createQuizDto: any): Promise<Quiz> {
    const quiz = new this.quizModel(createQuizDto);
    return quiz.save();
  }

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async findOne(id: string): Promise<Quiz | null> {
    return this.quizModel.findById(id).exec();
  }

  async update(id: string, updateQuizDto: any): Promise<Quiz | null> {
    return this.quizModel
      .findByIdAndUpdate(id, updateQuizDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Quiz | null> {
    return this.quizModel.findByIdAndDelete(id).exec();
  }
}
