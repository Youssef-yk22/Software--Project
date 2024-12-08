import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { Progress, ProgressSchema } from './models/progress.schema';
import { CertificationModule } from 'src/certification/certificate.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Progress.name, schema: ProgressSchema },
    ]),
    forwardRef(() => CertificationModule), // Use forwardRef here
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService], // Ensure the service is exported for use in CertificationModule
})
export class ProgressModule {}
