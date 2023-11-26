import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GatewaysModule } from './gateways/gateways.module';
import { RelationalModule } from './relational/relational.module';
import { MinioService } from './minio/minio.service';
import { DaysDataModule } from './days-data/days-data.module';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required()
      })
    }), 
    TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: +process.env.POSTGRES_PORT,
    autoLoadEntities: true,
    synchronize: true
  }),
    RelationalModule,
    AuthModule,
    GatewaysModule,
    DaysDataModule,
    ApisModule,
    ],
  controllers: [AppController],
  providers: [AppService, MinioService],
})
export class AppModule {}
