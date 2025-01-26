import { Module } from '@nestjs/common';
import { MetaOptionService } from './meta-option.service';
import { MetaOptionController } from './meta-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './entities/meta-option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaOption])],
  controllers: [MetaOptionController],
  providers: [MetaOptionService],
})
export class MetaOptionModule {}
