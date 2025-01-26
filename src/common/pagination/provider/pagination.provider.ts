import { ObjectLiteral, Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const results = await repository.find({
      relations: ['metaOptions', 'author', 'tags'],
      skip: (paginationQuery.page - 1) * paginationQuery.limit,
      take: paginationQuery.limit,
    });

    const baseUrl = this.request.protocol + '://' + this.request.hostname + '/';

    const newUrl = new URL(this.request.url, baseUrl);

    console.log(newUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page + 1;
    const previousPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page - 1;


    return results;
  }
}
