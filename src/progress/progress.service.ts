import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './models/progress.schema';
import { updateProgressDto } from './dto/updateprogress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
  ) {}

  async create(createProgressDto: any): Promise<Progress> {
    const progress = new this.progressModel(createProgressDto);
    return progress.save();
  }

  async findAll(): Promise<Progress[]> {
    return this.progressModel.find().exec();
  }

  async findOne(id: string): Promise<Progress | null> {
    return this.progressModel.findById(id).exec();
  }

  async update(
    id: string,
    updateProgressDto: updateProgressDto,
  ): Promise<Progress | null> {
    return this.progressModel
      .findByIdAndUpdate(id, updateProgressDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Progress | null> {
    return this.progressModel.findByIdAndDelete(id).exec();
  }

  async getProgress(userId: string, courseId: string): Promise<Progress> {
    const progress = await this.progressModel
      .findOne({ userId, courseId })
      .exec();
    if (!progress) {
      throw new NotFoundException('Progress not found');
    }
    return progress;
  }

  async calculateCompletion(
    userId: string,
    courseId: string,
  ): Promise<boolean> {
    const progress = await this.getProgress(userId, courseId);
    return progress.completionPercentage === 100;
  }
}
