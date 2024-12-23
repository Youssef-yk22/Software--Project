import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Backup, BackupDocument } from './models/backup.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackupService {
  constructor(
    @InjectModel(Backup.name) private backupModel: Model<BackupDocument>,
  ) {}

  /**
   * Create a backup for a specific data type.
   * @param dataType - The type of data to back up (e.g., "User Accounts").
   * @param data - The data to back up.
   */
  async createBackup(dataType: string, data: any): Promise<Backup> {
    const backupId = `backup-${Date.now()}`;
    const filePath = path.join(__dirname, `../../backups/${backupId}.json`);

    // Save data to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    // Save backup metadata to the database
    const backup = new this.backupModel({ backupId, dataType, filePath });
    return backup.save();
  }

  /**
   * Restore a backup from a file.
   * @param backupId - The ID of the backup to restore.
   */
  async restoreBackup(backupId: string): Promise<any> {
    const backup = await this.backupModel.findOne({ backupId });
    if (!backup) {
      throw new Error('Backup not found');
    }

    // Read data from the backup file
    const filePath = backup.filePath;
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  }

  /**
   * Fetch all backups.
   */
  async getAllBackups() {
    return this.backupModel.find().exec();
  }
}
