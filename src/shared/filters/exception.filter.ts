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
import { BaseResponseModel } from '@src/shared/models';

@Catch()
@Injectable()
export class GenericExceptionFilter implements ExceptionFilter {
  constructor(@Inject('winston') protected readonly logger: Logger) {

  }

  catch(exception: any, host: ArgumentsHost): any {
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
    respModel.message = respModel.errors[0].message;

    response.status(respModel.status).json(respModel);
  }

}
