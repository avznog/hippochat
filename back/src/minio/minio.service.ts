import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from "minio";
import * as sharp from 'sharp';
const convert = require('heic-convert');


@Injectable()
export class MinioService {
  private minioClient: Minio.Client
  constructor(
    private configService: ConfigService
  ) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') || "192.168.7.191",
      port: Number(this.configService.get('MINIO_PORT')) || 9000,
      useSSL: Boolean(this.configService.get('USE_SSL')) || false,
      accessKey: this.configService.get('MINIO_ACCESS_KEY') || "minioadmin",
      secretKey: this.configService.get('MINIO_SECRET_KEY') || "minioadmin"
    });
    this.minioClient.bucketExists("hippochat").then(exists => {
      if (!exists)
        this.minioClient.makeBucket("hippochat")
    })
  }

  async uploadFile(path: string, file: Express.Multer.File) {
    try {
      const filename = path.split("/").pop()
      const arrayPath = path.split("/");
      arrayPath.pop();
      arrayPath.pop();
      // ? uploading the file in 3 different qualities : small (80x100), medium (320,320) and original.
      // ! when loading the file from the front, the browser should load the smallest quality, display it,
      // ! and behind that load the original, and display it on top when it is loaded
      let f = file.buffer;
      if (path.toLowerCase().includes('heic') || path.toLowerCase().includes('heif')) {
        f = await convert({
          buffer: file.buffer,
          format: 'PNG'
        });
      }
      // ? resizing
      const smallFile = sharp(f).resize(80, 100, { fit: 'inside' }).rotate().webp({ quality: 80 });
      const mediumFile = sharp(f).resize(320, 320, { fit: 'inside' }).rotate().webp({ quality: 85 });;
      const originalFile = sharp(f).rotate().webp({ quality: 93 });

      // ? puting on minio
      this.minioClient.putObject("hippochat", `${arrayPath.join("/")}/80x100/${filename}`, smallFile);
      this.minioClient.putObject("hippochat", `${arrayPath.join("/")}/320x320/${filename}`, mediumFile);
      return await this.minioClient.putObject("hippochat", path, originalFile);
    } catch (error) {

    }
  }

  async generateUrl(path: string): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject("hippochat", path)
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async destroyFile(path: string) {
    try {
      return await this.minioClient.removeObject("hippochat", path);
    } catch (error) {
      return null
    }
  }
}
