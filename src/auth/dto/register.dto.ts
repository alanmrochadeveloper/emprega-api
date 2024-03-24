import { Optional } from "@nestjs/common";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { CategoryEnum } from "src/category/category.entity";

export class RegisterDTO {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm?: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    phone_number: string;

    @IsNotEmpty()
    category: CategoryEnum;

    @Optional()
    @MaxLength(255)
    tradingName: string;

    @Optional()
    @MaxLength(255)
    companyName: string;

    @Optional()
    stateInscr: string;

    @Optional()
    CNPJ: string;

    @Optional()
    logo: string;

    @Optional()
    logoFile: Buffer
}

