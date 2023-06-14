//import {RepositoryEnum} from '@shared/enums';
import { DataSource } from 'typeorm';
import { SubjectEntity, TeacherEntity } from '../products/entities';
import { RepositoryEnum } from 'src/shared/enums/repository.enum';
import { DataSourceEnum } from 'src/shared/enums/data-source.emus';

export const VentasProvider =[
    {
        provide: RepositoryEnum.TEACHER_REPOSITORY,
        useFactory:(DataSource:DataSource) =>
        DataSource.getRepository(TeacherEntity),
        inject:[DataSourceEnum.PG_DATA_SOURCE],
    
    },
    {
        provide: RepositoryEnum.SUBJECT_REPOSITORY,
        useFactory:(DataSource:DataSource) =>
        DataSource.getRepository(SubjectEntity),
        inject:[DataSourceEnum.PG_DATA_SOURCE],
    
    }

]
