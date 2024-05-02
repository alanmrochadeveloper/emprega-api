import { IsString } from "class-validator";

export class CreateJobCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  imagePath: string;

  @IsString()
  majorJobCategoryId: string;
}
