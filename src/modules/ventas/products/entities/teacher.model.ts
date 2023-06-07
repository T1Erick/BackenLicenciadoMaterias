
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SubjectEntity } from './subject.model';

//Tabla
@Entity('Teachers', { schema: 'ventas' })
export class TeacherEntity {
  //Tabla primaria
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

  @ManyToOne(() => SubjectEntity, subject => subject.teacher)
  subject:SubjectEntity;


  @Column('varchar', {
    name: 'name',
    comment: 'Nombre  del profesor',
    nullable: false, //atributo abligatorio
  })
  name: string;

  @Column('varchar', {
    name: 'second_name',
    comment: 'Apellido del Profesor',
    nullable: false, //atributo abligatorio
  })
  secondname: string;

  @Column('varchar', {
    name: 'title',
    comment: 'Titulo del profesor',
    nullable: false, //atributo obligatorio
  })
  title: number;

  @Column('boolean', {
    name: 'genero',
    comment: 'Genero del profesor',
    nullable: false, //atributo opcional
  })
  genero: string;



  @Column('varchar',{
    name: 'subject',
    comment: 'Materia del profesor',
    nullable: false
  })
  subjectAt: string;
}
  
  /***
   ayudan a hacer correcciones o conversiones antes de ingresar o actulizar la data, son triggers
   @BeforeInsert()
   @BeforeUpdate()

   Ecnriptar Contraseña antes de que se guarde en la base de datos
 * 
 * 
    @BeforeInsert()
    @BeforeUpdate()
    setPassword(){
        if (!this.password) {
            return;
        }
        this.password = await Bcrypt.hash(this.password,12);
    }
 * 
 * Guardar el mail con minusculas y sin espacios
    @BeforeInsert()
    @BeforeUpdate()
      async setMail () 
      {
          if(!this.mail){
              return;
          }
          this.mail = this.setMail.toLowerCase().trim; 
      }
 */


    

