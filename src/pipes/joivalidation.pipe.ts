import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

export interface JoiValidationOptions {
  strip: boolean;
}

@Injectable()
export class JoivalidationPipe implements PipeTransform {
  constructor(private joiSchema : ObjectSchema, private opts?: JoiValidationOptions) { }

  transform(inputValue: any, metadata: ArgumentMetadata) {
    let { error, value } = this.joiSchema.validate(inputValue, {
      abortEarly: false,
      stripUnknown: this.opts ? this.opts.strip : true
    });

    if (error) {
      let mappedErrors = error.details.map(err => err.message);
      throw new BadRequestException(mappedErrors, 'Validation failed');
    }

    return value;
  }
}
