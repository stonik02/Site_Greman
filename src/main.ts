import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get('port') || 3000
  app.useGlobalPipes(new ValidationPipe())


  const config = new DocumentBuilder()
    .setTitle("Store API")
    .setDescription("Сайт нижнего белья")
    .setVersion("1.0")
    .addTag("API")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  await app.listen(port)
  console.log("Server start on port : " + port)
}
bootstrap();