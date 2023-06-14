import { Injectable } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums';
import { TeacherEntity } from '../products/entities';
import { CreateTeacherDto } from '../products/dto/create.teacher.dto';
import { readTeacherDto } from '../products/dto/read.Teacher.dto';

@Injectable()
export class VentasService {
    constructor(
        @Injectable(RepositoryEnum.TEACHER_REPOSITORY)
        private repository: Respository<TeacherEntity>
    )
     async create(payload: CreateTeacherDto): Promise <SerciceResponseHttpModel>{
        const newTeacher = this.repository.create(payload)
        const teacherCreated = await this.repository.save(newTeacher)

        return {data: plainToInstance(readTeacherDto,teacherCreated)}
     } 
     async catalogue(): Promise<ServiceResponseHttpModel>{
        const response = this.repository.findAndCOunt({take:1000});
        return{ data:response[0],
        pagination:{totalItems: response[1],
        limit:10}}
     }
}
