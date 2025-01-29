import { Module, forwardRef } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryUploadProvider } from './cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUpload } from './entity/file-upload.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileUpload]),
    forwardRef(() => UserModule),
  ],
  providers: [FileUploadService, CloudinaryUploadProvider],
  exports: [FileUploadService],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
