import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { CloudinaryUploadProvider } from './cloudinary.provider';
import { Repository } from 'typeorm';
import { FileUpload } from './entity/file-upload.entity';
import { ICurrentUser } from '../auth/interfaces/current-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class FileUploadService {
  /**
   * @param fileUploadProvider
   */
  constructor(
    private readonly fileUploadProvider: CloudinaryUploadProvider,

    private readonly userService: UserService,

    @InjectRepository(FileUpload)
    private readonly fileUploadRepository: Repository<FileUpload>,
  ) {}

  /**
   * Handle file upload.
   * @param file Uploaded file using Multer
   * @param userId Extracted from the current user's JWT
   */

  public async uploadFile(file: Express.Multer.File, user: ICurrentUser) {
    if (!file) {
      throw new BadRequestException('No file provided for upload');
    }

    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Unsupported MIME type');
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      throw new BadRequestException('File size exceeds the 5MB limit');
    }

    let foundUser = undefined;

    try {
      try {
        foundUser = await this.userService.findOneById(user.sub);
      } catch (error) {
        throw new UnauthorizedException(error, {
          description: 'User not found',
        });
      }
      const uploadResponse = await this.fileUploadProvider.uploadFile(file);
      const { secure_url, public_id, resource_type } = uploadResponse;

      const uploadedFile = this.fileUploadRepository.create({
        url: secure_url,
        publicId: public_id,
        type: resource_type,
        mime: file.mimetype,
        uploadedBy: foundUser,
      });

      await this.fileUploadRepository.save(uploadedFile);

      return uploadedFile;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(error, {
        description: 'Failed to upload file',
      });
    }
  }

  /**
   * Handle file deletion.
   * @param publicId Public ID of the file to delete
   * @param userId Extracted from the current user's JWT
   */

  public async deleteFile(publicId: string) {
    if (!publicId) {
      throw new BadRequestException('Kindly enter the publicId of the file');
    }

    try {
      return await this.fileUploadProvider.deleteFile(publicId);
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Failed to delete file',
      });
    }
  }
}
