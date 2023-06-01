import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Connect Sphere App')
    .setDescription(
      'The Connect Sphere API is an application programming interface developed for the Connect Sphere project. This API offers advanced features for creating and managing customers and their contacts, providing a comprehensive solution for organizing and communicating efficiently within a network of customers. With the Connect Sphere API, developers can easily implement functionality that allows users to create customer profiles, add and manage contacts associated with each specific customer.',
    )
    .setVersion('1.0')
    .addTag('Clients')
    .addBearerAuth()
    .addTag('Contacts')
    .addBearerAuth()
    .addTag('Login')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );

  await app.listen(3000);
}
bootstrap();
