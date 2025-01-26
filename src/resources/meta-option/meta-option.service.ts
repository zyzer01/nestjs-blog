import { Injectable } from '@nestjs/common';
import { CreateMetaOptionDto } from './dto/create-meta-option.dto';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';
import { Repository } from 'typeorm';
import { MetaOption } from './entities/meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOptionDto: CreateMetaOptionDto) {
    const metaOptions = this.metaOptionRepository.create(createMetaOptionDto);

    return await this.metaOptionRepository.save(metaOptions);
  }

  findAll() {
    return `This action returns all metaOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metaOption`;
  }

  update(id: number, updateMetaOptionDto: UpdateMetaOptionDto) {
    return `This action updates a #${id} metaOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} metaOption`;
  }
}
