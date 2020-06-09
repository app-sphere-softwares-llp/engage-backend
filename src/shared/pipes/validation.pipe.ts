import { ArgumentMetadata, Inject, Optional, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequest } from '@/shared/utils';
import { Reflector } from '@nestjs/core';

export class ValidationPipe implements PipeTransform {

  constructor(@Inject() @Optional() private reflector: Reflector) {
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, { groups: [] });
    if (errors.length > 0) {
      const firstErrorObject = errors[0].constraints;
      BadRequest(Object.values(firstErrorObject)[0]);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
