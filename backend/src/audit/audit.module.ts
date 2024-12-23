import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Audit, AuditSchema } from './models/audit.schema';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
  ],
  providers: [AuditService],
  controllers: [AuditController], // Add the AuditController
  exports: [AuditService],
})
export class AuditModule {}
