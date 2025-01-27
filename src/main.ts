import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Nestjs Blog api')
    .setDescription('The Nestjs Blog API description')
    .setTermsOfService('http://swagger.io/terms/')
    .setLicense('MIT', 'http://swagger.io/license/')
    .addServer('http://localhost:3000', 'Local server')
    .addServer('https://nestjs-blog-api.herokuapp.com')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
