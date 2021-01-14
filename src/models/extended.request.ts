import { Request } from 'express';
import { IUserInfo } from './userinfo';

export interface ExtendedRequest extends Request {
    user?: IUserInfo
    userAccessToken?: string
    resources?: any
}