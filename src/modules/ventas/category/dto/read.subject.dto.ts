import { BaseSubjectDto } from "./base.subject.dto";
import {Exclude,Expose} from "class-transformer";

@Exclude()
export class readSubjectDto extends BaseSubjectDto{
    @Expose()
    readonly id;
    @Expose()
    readonly name;
    @Expose()
    readonly title;
    @Expose()
    readonly secondname;





}