import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponseModel } from '@src/shared/models';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, BaseResponseModel<T>> {

  /**
   * intercept incoming response and parse it to generic one
   * @param context
   * @param next
   */
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
    return next.handle()
      .pipe(
        map(resp => {
          // const http = context.switchToHttp();
          // const request = http.getRequest();
          // const headers = request.headers;

          // set locale based on request header from browser
          // this._generalService.locale = headers['accept-language'];
          // moment.locale(this._generalService.locale);

          // response model
          const newResponse = new BaseResponseModel<T>();
          newResponse.data = resp;
          newResponse.hasError = false;
          newResponse.errors = null;
          return newResponse;
        }),
      );
  }
}
