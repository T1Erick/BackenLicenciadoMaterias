
import { Injectable } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { SubjectEntity } from '../products/entities';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';
import { CreateSubjectDto } from '../category/dto/create.subject.dto';
import { ServiceResponseHttpModel } from 'src/shared/models/service-response-http.model';
import { readSubjectDto } from '../category/dto/read.subject.dto';
import { filterSubjectDto } from '../category/dto/filter.subject.dto';
import { UpdateSubjectDto } from '../category/dto/update.subject.dto';
import { PaginationDto } from '../products/pagination.dto';


@Injectable()
export class VentasService {
    constructor(
        @Injectable(RepositoryEnum.SUBJECT_REPOSITORY)
        private repository: Repository<SubjectEntity>
    ){}
    async create(payload: CreateSubjectDto):Promise<ServiceResponseHttpModel> {  //payload enviando un paramtro de tipo dto
      const newSong = this.repository.create(payload);
      const songCreated = await this.repository.save(newSong);  // await sigifica esperar

      return { data: plainToInstance(readSubjectDto, songCreated) }
  }
  async catalogue() :Promise<ServiceResponseHttpModel> {
      const response = this.repository.findAndCount({ take: 1000 });
      return {
          data: response[0],
          pagination: { totalItems: response[1], limit: 10 }
      };
  }

  async finAll(params?: filterSubjectDto):Promise<ServiceResponseHttpModel>{        //retorna todos los datos o todos los filtrado
      if (params?.limit > 0 && params?.page >= 0) {
          return await this.PaginateAndFilter(params);
      }
      const response = await this.repository.findAndCount({
          order: { updateAt: 'DESC' },   //COMO SE DESE VISUALIZAR LA DATA
      });
      return {
          data: plainToInstance(readSubjectDto, response[0]),
          pagination: { totalItems: response[1], limit: 10 },
      }
  }

  async finOne(id: string):Promise<ServiceResponseHttpModel> {        //retorna solo un ojeto
      const response = await this.repository.findOne({
          where: { id },
      });
      if (response) {
          throw new NotFoundException('La materia no ha sido encontrada');
      }
      return {data: plainToInstance(readSubjectDto, response)};
  }
  async update(id: string, payload: UpdateSubjectDto) :Promise<ServiceResponseHttpModel> {
      const response = await this.repository.findOneBy({ id });
      if (!response) {
          throw new NotFoundException('La materia no ha sido encontrada');
      }
      this.repository.merge(response, payload);
      this.repository.save(response);
      return {data: plainToInstance(UpdateSubjectDto, response)};
  }
  async remove(id: string) :Promise<ServiceResponseHttpModel> {
      const response = await this.repository.findOneBy({ id });
      if (!response) {
          throw new NotFoundException('La materia  no ha sido encontrada');
      }
      this.repository.softRemove(response);
      return {data: plainToInstance(readSubjectDto, response)};
  }
  async removeAll(payload: SubjectEntity[]) :Promise<ServiceResponseHttpModel>{
      const response = await this.repository.softRemove( payload);
      return {data : response};
  }

  private async PaginateAndFilter(params: filterSubjectDto):Promise<ServiceResponseHttpModel>{
      let where:
          FindOptionsWhere<SubjectEntity>
          FindOptionsWhere <SubjectEntity>[];
      where = {};
      let { page, search } = params;
      const {limit } = params;
      if (search){
          search = search.trim(),
          page = 0;
          where = [];
          //where.push({name: Ilike ('%${search}')})
      }
      const data = this.repository.findAndCount({
          relations: ['bloodType', 'gender'],
          where,
          take: limit,
          skip: PaginationDto.getOffset(limit,page),
      });
      return {pagination: {limit, totalItems:data[1]}, data: data[0]};
  }
}

