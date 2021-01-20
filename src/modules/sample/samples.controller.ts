import { Controller, Request, Body, Param, Get, Post, NotFoundException, Logger, Delete, HttpCode, NotImplementedException } from '@nestjs/common';
import { ExtendedRequest } from 'src/models/extended.request';
import { Permissions } from 'src/guards/permissions.guard';
import { JoivalidationPipe } from 'src/pipes/joivalidation.pipe';
import { Sample } from './sample.model';
import { SampleService } from './sample.service';

@Controller('samples')
export class SamplesController {
    constructor(private sampleService: SampleService) { }

    @Get()
    async get(@Request() req: ExtendedRequest): Promise<Sample[]> {
        Logger.log(`User name ${req.user.name}, Id ${req.user.id} hit GET Samples`)
        return await this.sampleService.find()
    }

    @Get(':id')
    async getById(@Request() req: ExtendedRequest, @Param('id') id: string): Promise<Sample> {
        Logger.log(`User name ${req.user.name}, Id ${req.user.id} hit GET Sample by Id`)
        let sample = await this.sampleService.findById(id)

        if (!sample) {
            throw new NotFoundException(`Sample with Id ${id} not found`)
        }

        return sample
    }

    @Post()
    async create(@Request() req: ExtendedRequest, @Body(new JoivalidationPipe(Sample.validationSchema)) body: Sample) {
        Logger.log(`User name ${req.user.name}, Id ${req.user.id} hit POST Sample`)
        return await this.sampleService.create(body)
    }

    @Delete(':id')
    @Permissions('delete:samples')
    @HttpCode(204)
    async delete(@Request() req: ExtendedRequest, @Param('id') id: string) {
        throw new NotImplementedException()
    }
}