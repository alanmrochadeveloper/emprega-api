import { IsOptional, IsString } from "class-validator";
import { CategoryEnum } from "src/category/category.entity";

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  category: CategoryEnum;
}
