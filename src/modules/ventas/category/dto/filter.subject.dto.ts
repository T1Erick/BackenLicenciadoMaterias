import { IsNumber, IsOptional, IsString } from "class-validator";
import { Subject } from "typeorm/persistence/Subject";
import { PaginationDto } from "../pagination.dto";




export class filterSubjectDto extends PaginationDto {

    @IsOptional()
    @IsString(isStringValidationOptions())
    readonly name: string
    @IsOptional()
    @IsString({message: 'El campo segundo nombre es un string'})
    readonly secondname: string
    
    
    

}