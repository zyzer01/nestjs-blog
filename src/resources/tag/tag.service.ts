import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { In, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);

    return await this.tagRepository.save(newTag);
  }

  findAll() {
    return `This action returns all tag`;
  }

  public async findMultipleTags(tags: number[]) {
    const result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  public async remove(id: number) {
    await this.tagRepository.delete(id);
    return `This action removes a #${id} tag`;
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return `This action SOFT removes a #${id} tag`;
  }
}
