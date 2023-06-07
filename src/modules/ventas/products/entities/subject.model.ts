import {
   
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeacherEntity } from './teacher.model';



@Entity('categories',{schema: 'ventas'})

export class SubjectEntity{

    @PrimaryGeneratedColumn('uuid') //uuid es para indicar que es el primary key
    id: string;

    @CreateDateColumn({
        name: 'created_at', //nombre de la columna
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP,',
      })
      createAt: Date; //nombre del atributo-propiedad
    
     @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP,',
      })
      updateAt: Date;
    
      @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
      })
      deleteAt: Date;

      @OneToMany(() => TeacherEntity, teacher => teacher.subject)
       teacher:TeacherEntity[];

    @Column('varchar', {
        name: 'name_subject',
        comment: 'Nombre de la materia ',
        nullable: false, //atributo obligatorio
    })
     name_category: number;
    
    @Column('varchar', {
        name: 'description_subject',
        comment: 'Descripcion de la materia',
        nullable: true,
    })
    description_Category: string;

    
}