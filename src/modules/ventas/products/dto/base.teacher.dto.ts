import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SubjectEntity } from "../entities/subject.entity";


export  class BaseTeacherDto{

    @Allow()
    readonly subject: SubjectEntity;

    @IsString()
    @IsNotEmpty( isNotEmptyValidationOptions())
    readonly name;

    @IsString()
    @IsNotEmpty()
    readonly secondname;


    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsString()
    @IsBoolean()
    readonly genero;

    
   

}