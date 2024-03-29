import { IsString } from 'class-validator';

export class CreateJobCategoryDto {
    @IsString()
    name: string;
}