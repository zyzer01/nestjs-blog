import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IFileUploadProvider } from './interfaces/file-upload-provider';
import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';

@Injectable()
export class CloudinaryUploadProvider implements IFileUploadProvider {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {
    cloudinary.config({
      cloud_name: this.appConfiguration.cloudinaryCloudName,
      api_key: this.appConfiguration.cloudinaryApiKey,
      api_secret: this.appConfiguration.cloudinaryApiSecret,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );

      // Pipe file buffer to the upload stream
      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(publicId: string): Promise<any> {
    return cloudinary.uploader.destroy(publicId);
  }
}
