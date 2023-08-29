import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from "minio";

@Injectable()
export class MinioService {
  private minioClient: Minio.Client
  constructor(
    private configService: ConfigService
  ) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') || "localhost",
      port: Number(this.configService.get('MINIO_PORT')) || 9000,
      useSSL: false,
      accessKey: this.configService.get('MINIO_ACCESS_KEY') || "minioadmin",
      secretKey: this.configService.get('MINIO_SECRET_KEY') || "minioadmin"
    });
    this.minioClient.bucketExists("hippochat").then(exists => {
      if(!exists)
        this.minioClient.makeBucket("hippochat")
    })
  }

  async getFile(path: string) {
    try {
      return await this.minioClient.getObject("hippochat", path);
    } catch (error) {
      return null
    }
  }

  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      return await this.minioClient.putObject("hippochat", path, file.buffer);
    } catch (error) {
      
    }
  }
}
