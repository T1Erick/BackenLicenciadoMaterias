import {  IsNotEmpty,IsString } from "class-validator";

export  class BaseSubjectDto{
    @IsString()
    @IsNotEmpty( isNotEmptyValidationOptions())
    readonly name_subject;

    @IsString()
    @IsNotEmpty()
    readonly description_subject;




   
   

}