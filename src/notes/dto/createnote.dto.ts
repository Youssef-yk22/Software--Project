export class createNoteDto {
  noteId: string;
  userId: string;
  courseId?: string;
  content: string;
  createdAt: Date;
  lastUpdated: Date;
}
