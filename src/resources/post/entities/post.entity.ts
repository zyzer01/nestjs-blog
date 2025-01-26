import { MetaOption } from 'src/resources/meta-option/entities/meta-option.entity';
import { CreateMetaOptionDto } from '../../meta-option/dto/create-meta-option.dto';
import { PostStatus } from '../enum/post-status.enum';
import { PostType } from './../enum/post-type.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/resources/user/user.entity';
import { Tag } from 'src/resources/tag/entities/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;

  @Column({
    type: 'enum',
    nullable: true,
    enum: PostType,
    default: PostType.POST,
  })
  postType: PostType;

  @Column({
    type: 'enum',
    nullable: true,
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1024,
  })
  featuredImage?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  publishedOn?: Date;

  @ManyToMany(() => Tag, (tag) => tag.post)
  @JoinTable()
  tags?: Tag[];

  @ManyToOne(() => User, (user) => user.post)
  author: User;

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
  })
  metaOptions?: CreateMetaOptionDto;
}
