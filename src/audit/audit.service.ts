import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audit, AuditDocument } from './models/audit.schema';

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(Audit.name) private auditModel: Model<AuditDocument>,
  ) {}

  /**
   * Log an event in the audit system.
   * @param userId - The ID of the user.
   * @param event - The event description.
   */
  async logEvent(userId: string, event: string) {
    const audit = new this.auditModel({ userId, event });
    return audit.save();
  }

  /**
   * Fetch all audit logs.
   */
  async getAllLogs() {
    return this.auditModel.find().exec();
  }
  /**
   * Fetch logs for a specific user.
   */
  async getLogsByUser(userId: string) {
    return this.auditModel.find({ userId }).exec();
  }

  /**
   * Fetch logs for suspicious activities.
   * @param event - The suspicious event to search for.
   */
  async getSuspiciousLogs(event: string) {
    return this.auditModel.find({ event }).exec();
  }
}
