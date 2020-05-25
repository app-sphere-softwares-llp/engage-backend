import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { Error } from 'mongoose';
import { Logger } from 'winston';
import { BaseResponseModel } from '@/shared/models';
import { I18nRequestScopeService, I18nService } from 'nestjs-i18n';

@Catch()
@Injectable()
export class GenericExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') protected readonly logger: Logger) {

  }

  async catch(exception: any, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const respModel = new BaseResponseModel();
    this.logger.error(exception, [{ stack: exception }]);

    if (exception instanceof MongoError) {
      // normal mongo errors
      respModel.errors = [{
        message: exception.errmsg || exception.message,
        type: 'error',
      }];
      respModel.status = 500;
    } else if (exception.response instanceof MongoError) {
      // mongo duplicate error and etc...
      respModel.errors = [{
        message: exception.response.errmsg || exception.response.message,
        type: 'error',
      }];
      respModel.status = 500;
    } else if (exception instanceof Error.ValidationError) {
      // mongoose validation errors
      if (Array.isArray(exception.message)) {
        respModel.errors = [
          ...(exception as any).message.map(m => {
            return { type: 'error', message: m };
          }),
        ];
      } else {
        respModel.errors = [{
          message: exception.message,
          type: 'error',
        }];
      }
      respModel.status = 400;
    } else if (exception instanceof Error.CastError || exception instanceof Error.DocumentNotFoundError || exception instanceof Error.MissingSchemaError) {
      // mongoose cast errors
      respModel.errors = [{
        message: exception.message,
        type: 'error',
      }];
      respModel.status = 500;
    } else if (exception instanceof HttpException) {

      // mongoose validation errors
      if (exception.getResponse() instanceof Error.ValidationError) {
        respModel.errors = [
          ...(exception.getResponse() as any).message.map(m => {
            return { type: 'error', message: m };
          }),
        ];
      } else {
        // http errors
        respModel.errors = [{
          message: (exception.getResponse() as any).message || (exception.getResponse() as any).error,
          type: 'error',
        }];
      }
      respModel.status = exception.getStatus();

    } else if (exception instanceof UnauthorizedException) {
      respModel.errors = [{
        message: exception.message,
        type: 'error',
      }];
      respModel.status = exception.getStatus();
    } else if (exception instanceof Error) {
      respModel.errors = [{
        message: exception.message,
        type: 'error',
      }];
      respModel.status = 401;
    } else {
      respModel.errors = [{
        message: 'Something Went Wrong',
        type: 'error',
      }];
      respModel.status = 500;
    }

    respModel.data = null;
    respModel.hasError = true;

    const tKey = respModel.errors[0].message.split('{')[0];
    if (tKey.trim()) {
      respModel.message = await this.i18nService.translate('VALIDATION_ERRORS.REQUIRED', {
        lang: 'en',
        // args: { field: respModel.errors[0].message.match(/\{([^}]+)\}/)[1] },
      });
    } else {
      respModel.message = respModel.errors[0].message;
    }
    return response.status(respModel.status).json(respModel);
  }

}
