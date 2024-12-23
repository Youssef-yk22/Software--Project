import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './models/notes.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: any): Promise<Note> {
    const note = new this.noteModel(createNoteDto);
    return note.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note | null> {
    return this.noteModel.findById(id).exec();
  }

  async update(id: string, updateNoteDto: any): Promise<Note | null> {
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Note | null> {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
