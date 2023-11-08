import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [process.env.BASE_URL, "https://api.positionstack.com", "http://localhost:8100", "http://10.41.42.6:8100", "capacitor://localhost", "http://localhost", "http://localhost:8101", "http://192.168.7.191:8100", "http://192.168.7.191:8100", "http://10.40.42.148:8100", "http://192.168.7.191:8100", "http://10.142.40.165:8100", "http://10.221.14.108:8100", "http://172.20.10.3:8100", "http://localhost:8102"]
  })

  // ? swagger configuration
  const options = new DocumentBuilder()
    .setTitle("Hippochat API")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  app.useWebSocketAdapter(new IoAdapter(app))

  await app.listen(3003);
}
bootstrap();
