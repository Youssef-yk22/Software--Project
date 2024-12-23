import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, ResponseDocument } from './models/responses.schema';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectModel(Response.name) private responseModel: Model<ResponseDocument>,
  ) {}

  async create(createResponseDto: any): Promise<Response> {
    const response = new this.responseModel(createResponseDto);
    return response.save();
  }

  async findAll(): Promise<Response[]> {
    return this.responseModel.find().exec();
  }

  async findOne(id: string): Promise<Response | null> {
    return this.responseModel.findById(id).exec();
  }

  async update(id: string, updateResponseDto: any): Promise<Response | null> {
    return this.responseModel
      .findByIdAndUpdate(id, updateResponseDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Response | null> {
    return this.responseModel.findByIdAndDelete(id).exec();
  }
}
