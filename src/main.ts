import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { ValidationPipe } from '@/shared/pipes';
import { ResponseInterceptor } from '@/shared/interceptors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  // swagger setup
  const options = new DocumentBuilder()
    .setTitle('Engage APi')
    .setDescription('The Engage API description')
    .setVersion('0.0.2')
    .addTag('engage')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // listen on port
  await app.listen(process.env.port || 3000);
}

bootstrap();
