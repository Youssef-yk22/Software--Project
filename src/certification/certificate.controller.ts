import { Controller, Post, Body } from '@nestjs/common';
import { CertificationService } from './certificate.service';
import { RequestCertificateDto } from './dto/requestcertificate.dto';

@Controller('certifications')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  /**
   * Endpoint to generate a certificate.
   * @param requestCertificateDto - The request details for certificate generation.
   * @returns The generated certificate.
   */
  @Post('generate')
  async generateCertificate(
    @Body() requestCertificateDto: RequestCertificateDto,
  ) {
    const { userId, courseId } = requestCertificateDto;
    return this.certificationService.generateCertificate(userId, courseId);
  }
}
