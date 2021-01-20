import { Request } from 'express';
import { Tenant } from 'src/modules/tenant/tenant.model';
import { IUserInfo } from './userinfo';

export interface ExtendedRequest extends Request {
    user?: IUserInfo
    userAccessToken?: string
    tenantInfo: Tenant
    resources?: any
}