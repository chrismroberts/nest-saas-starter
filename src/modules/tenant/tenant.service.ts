import { Injectable } from '@nestjs/common';
import { Tenant } from './tenant.model';

@Injectable()
export class TenantService {
    private tenants: Tenant[] = [
        {
            tenant_id: 'tenant1',
            name: 'Tenant 1'
        },
        {
            tenant_id: 'tenant2',
            name: 'Tenant 2'
        }
    ]

    findById(tenantId: string): Promise<Tenant> {
        return Promise.resolve(this.tenants.find(t => t.tenant_id == tenantId))
    }
}