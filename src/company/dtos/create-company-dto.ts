import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    tradingName: string;

    @IsString()
    @IsNotEmpty()
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    stateInscr: string;

    @IsInt()
    @IsNotEmpty()
    employeesNumber: number;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

