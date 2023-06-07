import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SubjectEntity } from "../entities/subject.model";


export  class BaseTeacherDto{
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

    @IsNumber()
    @IsNotEmpty()
    readonly subject: SubjectEntity
   

}