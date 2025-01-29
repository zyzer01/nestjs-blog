import { User } from 'src/resources/user/user.entity';

export interface IFileUpload {
  name: string;
  url: string;
  type: string;
  mime: string;
  uploadedBy: User;
}
