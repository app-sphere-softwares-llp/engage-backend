import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  // swagger setup
  const options = new DocumentBuilder()
    .setTitle('Engage APi')
    .setDescription('The Engage API description')
    .setVersion('0.0.1')
    .addTag('engage')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // listen on port
  await app.listen(process.env.port || 3000);
}

bootstrap();
