import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { ExtendedRequest } from 'src/models/extended.request';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) { }

  async use(req: ExtendedRequest, res: any, next: () => void) {
    let tenantId = req.headers['x-tenant-id']
    if (!tenantId) {
      throw new BadRequestException('Tenant header must be specified as x-tenant-id')
    }

    let tenant = await this.tenantService.findById(tenantId as string)
    if (!tenant) {
      throw new NotFoundException(`Tenant with Id ${tenantId} not found`)
    }
    
    req.tenantInfo = tenant
    next()
  }
}
