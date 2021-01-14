import { Injectable } from '@nestjs/common';
import { newId } from 'src/utils';
import { Sample } from './sample.model';

@Injectable()
export class SampleService {
    private samples: Sample[] = [
        {
            id: newId('sample'),
            count: 2,
            name: 'Red Widget',
            email: 'widgets@sample.foo',
            status: 'Available'
        },
        {
            id: newId('sample'),
            count: 10,
            name: 'Green Widget',
            email: 'widgets@sample.foo',
            status: 'Unavailable'
        },
        {
            
            id: newId('sample'),
            count: 10,
            name: 'Blue Widget',
            email: 'widgets@sample.foo',
            status: 'Available'
        }
    ]

    find(): Promise<Sample[]> {
        return Promise.resolve(this.samples)
    }

    findById(id: string): Promise<Sample> {
        return Promise.resolve(this.samples.find(s => s.id == id))
    }

    create(sampleObj: Sample) {
        sampleObj.id = newId('sample')
        this.samples.push(sampleObj)
        
        return sampleObj
    }
}
