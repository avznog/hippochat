import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from "minio";
import { Mate } from 'src/relational/mates/entities/mate.entity';

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

  // async addProfilePicture(mate: Mate, file: Express.Multer.File) {
  //   try {
  //     // await this.minioClient.fGetObject("hippochat","/profile-pictures/bengonzva75@gmail.com/profile-picture.png", "./profile-picture.png")
  //     if(!await this.minioClient.bucketExists("hippochat")){
  //       await this.minioClient.makeBucket("hippochat")
  //     }
  //     return await this.minioClient.putObject("hippochat", `/profile-pictures/${mate.email}/${file.originalname}`,file.buffer, {
  //       'Content-Type': file.mimetype,
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      return await this.minioClient.putObject("hippochat", path, file.buffer);
    } catch (error) {
      
    }
  }
}
