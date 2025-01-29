import { User } from 'src/resources/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class FileUpload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  url: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  publicId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  mime: string;

  @ManyToOne(() => User)
  uploadedBy: User;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
