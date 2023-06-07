import { IsNumber, IsOptional, IsString } from "class-validator";
import { Subject } from "typeorm/persistence/Subject";
import { PaginationDto } from "./pagination.dto";



export class filterTeacherDto extends PaginationDto {

    @IsOptional()
    @IsString(isStringValidationOptions())
    readonly name: string
    @IsOptional()
    @IsString({message: 'El campo segundo nombre es un string'})
    readonly secondname: string
    @IsOptional()
    @IsNumber({message: 'El campo codigo de la categoria es opcional'})
    readonly subject: Subject
    
    

}