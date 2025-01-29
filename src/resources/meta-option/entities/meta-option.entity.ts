import { Post } from 'src/resources/post/entities/post.schema';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MetaOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  metaValue: string;

  @OneToOne(() => Post, (post) => post.metaOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
