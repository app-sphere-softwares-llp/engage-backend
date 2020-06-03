import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@/shared/pipes';
import { ResponseInterceptor } from '@/shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // swagger setup
  const options = new DocumentBuilder()
    .setTitle('Engage APi')
    .setDescription('The Engage API description')
    .setVersion('0.0.1')
    .addTag('engage')
    .addBearerAuth()
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // listen on port
  await app.listen(process.env.port || 3000);
}

bootstrap();
