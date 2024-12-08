import { forwardRef, Module } from '@nestjs/common';
import { CertificationService } from './certificate.service';
import { CertificationController } from './certificate.controller';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [forwardRef(() => ProgressModule)], // Use forwardRef here
  controllers: [CertificationController],
  providers: [CertificationService],
  exports: [CertificationService], // Ensure the service is exported for use in other modules
})
export class CertificationModule {}
