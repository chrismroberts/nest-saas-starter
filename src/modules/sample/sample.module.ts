import { Module } from '@nestjs/common';
import { SamplesController } from './samples.controller';
import { SampleService } from './sample.service';

@Module({
  controllers: [SamplesController],
  providers: [SampleService]
})
export class SampleModule {}
