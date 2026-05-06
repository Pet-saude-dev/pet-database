import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3001;

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('PET Database API')
    .setDescription('API centralizada de dados do PET Saúde Digital')
    .setVersion('1.0')
    .addTag('users')
    .addTag('professionals')
    .addTag('managers')
    .addTag('chat-sessions')
    .addTag('appointments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Swagger disponível em http://localhost:${port}/api`);
}
bootstrap();