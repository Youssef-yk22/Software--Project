import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Modules, ModuleDocument } from './models/modules.schema';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Modules.name) private moduleModel: Model<ModuleDocument>,
  ) {}

  async create(createModuleDto: any): Promise<Modules> {
    const module = new this.moduleModel(createModuleDto);
    return module.save();
  }

  async findAll(): Promise<Modules[]> {
    return this.moduleModel.find().exec();
  }

  async findOne(id: string): Promise<Modules | null> {
    return this.moduleModel.findById(id).exec();
  }

  async update(id: string, updateModuleDto: any): Promise<Modules | null> {
    return this.moduleModel
      .findByIdAndUpdate(id, updateModuleDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Modules | null> {
    return this.moduleModel.findByIdAndDelete(id).exec();
  }
  async findByCourseId(courseId: string): Promise<Modules[]> {
    return this.moduleModel.find({ courseId }).exec();
  }
}
