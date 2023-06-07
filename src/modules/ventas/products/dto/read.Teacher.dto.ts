import { BaseTeacherDto } from "./base.teacher.dto";

export class readTeacherDto extends BaseTeacherDto{
    @Expose()
    readonly id;
    @Expose()
    readonly name;
    @Expose()
    readonly title;
    @Expose()
    readonly secondname;





}