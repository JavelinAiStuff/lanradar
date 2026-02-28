import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponse } from '@lanradar/shared';

const startTime = Date.now();

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor((Date.now() - startTime) / 1000),
    };
  }
}
