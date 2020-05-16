import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { WinstonModule } from 'nest-winston';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as winston from 'winston';
import { resolvePath } from '@src/shared/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { DEFAULT_TRANSLATION_LANGUAGE } from '@src/shared/constants';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from '@src/shared/interceptors';
import { GenericExceptionFilter } from '@src/shared/filters';
import { ValidationPipe } from '@src/shared/pipes';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EasyconfigModule.register({ path: `${__dirname}/.env.${process.env.NODE_ENV || 'dev'}` }),
    MongooseModule.forRoot(process.env.DB_CONNECTION_STRING),
    WinstonModule.forRoot({
      level: 'error',
      transports: [
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint(),
          ),
          filename: resolvePath('error.log'),
        }),
      ],
    }),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_TRANSLATION_LANGUAGE,
      parser: I18nJsonParser,
      parserOptions: {
        path: resolvePath('/i18n/'),
        watch: true,
      },
      resolvers: [
        new HeaderResolver(['x-local-lang']),
      ],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GenericExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {
}
