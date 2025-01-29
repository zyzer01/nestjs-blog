export interface IFileUploadProvider {
  uploadFile(file: Express.Multer.File): Promise<any>;
  deleteFile(publicId: string): Promise<any>;
}
