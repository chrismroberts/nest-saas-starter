import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { JoivalidationPipe } from 'src/pipes/joivalidation.pipe';
import { Sample } from './sample.model';
import { SampleService } from './sample.service';

@Controller('samples')
export class SamplesController {
    constructor(private sampleService: SampleService) { }

    @Get()
    async get(): Promise<Sample[]> {
        return await this.sampleService.find()
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Sample> {
        let sample = await this.sampleService.findById(id)
        if (!sample) {
            throw new NotFoundException(`Sample with Id ${id} not found`)
        }

        return sample
    }

    @Post()
    async create(@Body(new JoivalidationPipe(Sample.validationSchema)) body: Sample) {
        return await this.sampleService.create(body)
    }
}
