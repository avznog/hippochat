import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [process.env.BASE_URL, "http://localhost:8100", "http://192.168.1.15:8100"]
    })

  // ? swagger configuration
  const options = new DocumentBuilder()
    .setTitle("Hippochat API")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  
  await app.listen(3003);
}
bootstrap();
