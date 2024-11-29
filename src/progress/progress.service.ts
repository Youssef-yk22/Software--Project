import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Progress, ProgressDocument } from './models/progress.schema';

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

  async update(id: string, updateProgressDto: any): Promise<Progress | null> {
    return this.progressModel
      .findByIdAndUpdate(id, updateProgressDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Progress | null> {
    return this.progressModel.findByIdAndDelete(id).exec();
  }
}
