import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { BackupService } from './backup.service';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  /**
   * Create a backup.
   * @param dataType - The type of data to back up.
   * @param data - The data to back up.
   */
  @Post('create')
  async createBackup(
    @Body() { dataType, data }: { dataType: string; data: any },
  ) {
    return this.backupService.createBackup(dataType, data);
  }

  /**
   * Restore a backup.
   * @param backupId - The ID of the backup to restore.
   */
  @Post('restore/:backupId')
  async restoreBackup(@Param('backupId') backupId: string) {
    return this.backupService.restoreBackup(backupId);
  }

  /**
   * Fetch all backups.
   */
  @Get()
  async getAllBackups() {
    return this.backupService.getAllBackups();
  }
}
