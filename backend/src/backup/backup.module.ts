import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Backup, BackupSchema } from './models/backup.schema';
import { BackupService } from 'src/backup/backup.service';
import { BackupController } from 'src/backup/backup.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Backup.name, schema: BackupSchema }]),
  ],
  providers: [BackupService],
  controllers: [BackupController],
})
export class BackupModule {}
