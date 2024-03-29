import { IsNotEmpty, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    userId: string;
}

