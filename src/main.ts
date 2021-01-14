const BASE_PATH = process.env.BASE_PATH || '';
const PORT = process.env.PORT || 3000;
const VERSION = '0.1.0';
const APPNAME = 'Nest Starter API';

import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as assert from 'assert';
dotenv.config();

Logger.log(`Starting ${APPNAME} version ${VERSION}`)
Logger.log('Ensuring environment is configured correctly..')

assert.strictEqual(true, !BASE_PATH.endsWith('/'), 'API_BASE_PATH must not include a trailing /');
//assert(process.env.MONGO_CONNECTION, 'Must specify Mongo connection string as MONGO_CONNECTION')
//assert(process.env.AUTH_DOMAIN, 'Must specify Auth0 Domain as AUTH_DOMAIN')
//assert(process.env.AUTH_AUDIENCE, 'Must specify Auth0 API Audience as AUTH_AUDIENCE')

Logger.log('Environment is OK')

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  if (BASE_PATH) {
    Logger.log(`Setting global prefix to ${BASE_PATH}`);
    app.setGlobalPrefix(BASE_PATH);
  }

  await app.listen(PORT);
  Logger.log(`${APPNAME} up and listening on ${PORT}`);
}
bootstrap();
