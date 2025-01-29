import { CurrentUser } from './../auth/decorators/current-user.decorator';
import { ICurrentUser } from 'src/resources/auth/interfaces/current-user.interface';
import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthType } from '../auth/enums/auth-type.enum';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';

@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    {
      name: 'Authorization',
      description: 'Bearer Token',
    },
  ])
  @ApiOperation({
    summary: 'Upload file to cloudinary',
  })
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('sub') currentUser: ICurrentUser,
  ) {
    const result = await this.fileUploadService.uploadFile(file, currentUser);
    return result;
  }

  @Auth(AuthType.None)
  @Delete('delete/:publicId')
  public async deleteFile(
    @Param('publicId') publicId: string,
    @CurrentUser('sub') currentUser: string,
  ) {
    const result = await this.fileUploadService.deleteFile(publicId);
    return {
      success: true,
      message: 'File deleted successfully',
      data: result,
      deletedBy: currentUser,
    };
  }
}
