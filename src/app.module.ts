import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { WinstonModule } from 'nest-winston';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import * as winston from 'winston';
import { resolvePath } from '@/shared/utils';
import { MongooseModule } from '@nestjs/mongoose';
import { DEFAULT_TRANSLATION_LANGUAGE } from '@/shared/constants';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { GenericExceptionFilter } from '@/shared/filters';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from '@/projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { InvitationModule } from './invitation/invitation.module';
import { AttachmentModule } from './attachment/attachment.module';
import { ScreenshotModule } from './screenshot/screenshot.module';
import * as path from 'path';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import { ValidationPipe } from '@/shared/pipes';


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
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(`${__dirname}/i18n/`),
        watch: true,
      },
      resolvers: [
        new HeaderResolver(['x-local-lang']),
      ],
    }),
    UsersModule,
    ProjectsModule,
    AuthModule,
    ActivityModule,
    InvitationModule,
    AttachmentModule,
    ScreenshotModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
    {
      provide: APP_FILTER,
      useClass: GenericExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {

  constructor() {
    i18next.use(Backend).init({
      fallbackLng: DEFAULT_TRANSLATION_LANGUAGE,
      lng: DEFAULT_TRANSLATION_LANGUAGE,
      debug: true,
      ns: 'tl',
      defaultNS: 'tl',
      backend: {
        loadPath: path.join(__dirname, 'i18n/{{lng}}/{{ns}}.json'),
      },
      keySeparator: '.',
    });
  }

}
