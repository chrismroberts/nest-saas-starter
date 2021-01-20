import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './guards/permissions.guard';
import { AuthMiddleware } from './middleware/auth.middleware';
import { SampleModule } from './modules/sample/sample.module';
import { TenantMiddleware } from './modules/tenant/tenant.middleware';
import { TenantModule } from './modules/tenant/tenant.module';

@Module({
  imports: [SampleModule, TenantModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: PermissionsGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
