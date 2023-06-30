import { Injectable } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { TeacherEntity } from '../products/entities';
import { CreateTeacherDto } from '../products/dto/create.teacher.dto';
import { readTeacherDto } from '../products/dto/read.Teacher.dto';
import { UpdateTeacherDto } from '../products/dto/update.teacher.dto';
import { filterTeacherDto } from '../products/dto/filter.teacher.dto';
import { PaginationDto } from '../products/pagination.dto';
import { ServiceResponseHttpModel } from 'src/shared/models/service-response-http.model';
import { FindOptions, FindOptionsWhere, Repository } from 'typeorm';


@Injectable()
export class VentasService {
    constructor(
        @Injectable(RepositoryEnum.TEACHER_REPOSITORY)
        private repository: Repository<TeacherEntity>
    ){}
    async create(payload: CreateTeacherDto):Promise<ServiceResponseHttpModel> {  //payload enviando un paramtro de tipo dto
      const newTeacher = this.repository.create(payload);
      const teacherCreated = await this.repository.save(newTeacher);  // await sigifica esperar

      return { data: plainToInstance(readTeacherDto, teacherCreated) }
  }
  async catalogue() :Promise<ServiceResponseHttpModel> {
      const response = this.repository.findAndCount({ take: 1000 });
      return {
          data: response[0],
          pagination: { totalItems: response[1], limit: 10 }
      };
  }

  async finAll(params?: filterTeacherDto):Promise<ServiceResponseHttpModel>{        //retorna todos los datos o todos los filtrado
      if (params?.limit > 0 && params?.page >= 0) {
          return await this.PaginateAndFilter(params);
      }
      const response = await this.repository.findAndCount({
          order: { updateAt: 'DESC' },   //COMO SE DESE VISUALIZAR LA DATA
      });
      return {
          data: plainToInstance(readTeacherDto, response[0]),
          pagination: { totalItems: response[1], limit: 10 },
      }
  }

  async finOne(id: string):Promise<ServiceResponseHttpModel> {        //retorna solo un ojeto
      const response = await this.repository.findOne({
          where: { id },
      });
      if (response) {
          throw new NotFoundException('El Profesor no ha sido encontrada');
      }
      return {data: plainToInstance(readTeacherDto, response)};
  }
  async update(id: string, payload: UpdateTeacherDto) :Promise<ServiceResponseHttpModel> {
      const response = await this.repository.findOneBy({ id });
      if (!response) {
          throw new NotFoundException('EL Profesor no ha sido encontrada');
      }
      this.repository.merge(response, payload);
      this.repository.save(response);
      return {data: plainToInstance(UpdateTeacherDto, response)};
  }
  async remove(id: string) :Promise<ServiceResponseHttpModel> {
      const response = await this.repository.findOneBy({ id });
      if (!response) {
          throw new NotFoundException('El profesor no ha sido encontrada');
      }
      this.repository.softRemove(response);
      return {data: plainToInstance(readTeacherDto, response)};
  }
  async removeAll(payload: TeacherEntity[]) :Promise<ServiceResponseHttpModel>{
      const response = await this.repository.softRemove( payload);
      return {data : response};
  }

  private async PaginateAndFilter(params: filterTeacherDto):Promise<ServiceResponseHttpModel>{
      let where:
          FindOptionsWhere<TeacherEntity>
          FindOptionsWhere <TeacherEntity>[];
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
