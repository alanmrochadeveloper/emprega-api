import { Optional } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { CategoryEnum } from "src/category/category.entity";
import { EnumPersonType } from "src/person/person.entity";
import { normalizeCnpj } from "src/utils/normalizeCnpj";
import { normalizeCpf } from "src/utils/normalizeCpf";

export class RegisterDTO {
  @IsNotEmpty({ message: "O nome não pode estar vazio" })
  first_name: string;

  @IsNotEmpty({ message: "O sobrenome não pode estar vazio" })
  last_name: string;

  @IsNotEmpty({ message: "O email é um campo obrigatório!" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "A senha não pode estar vazia!" })
  password: string;

  @IsNotEmpty({ message: "A senha de confirmação não pode estar vazia!" })
  password_confirm?: string;

  @IsNotEmpty({ message: "Endereço não pode estar vazio!" })
  address: string;

  @Optional()
  @Transform(({ value }) => normalizeCpf(value))
  cpf: string;

  @Optional()
  avatarPath: string;

  @Optional()
  avatarFile: Buffer;

  @IsNotEmpty({ message: "Tipo da pessoa não pode estar vazio!" })
  personType: EnumPersonType;

  @IsNotEmpty({ message: "Número de telefone não pode ser vazio!" })
  phone_number: string;

  @IsNotEmpty({ message: "Categoria deve ser preenchida!" })
  category: CategoryEnum;

  @Optional()
  tradingName: string;

  @Optional()
  companyName: string;

  @Optional()
  @Transform(({ value }: { value: string }) => value.replaceAll(".", ""), {
    toPlainOnly: true,
  })
  stateInscr: string;

  @Optional()
  @Transform(({ value }) => normalizeCnpj(value), { toPlainOnly: true })
  cnpj: string;

  @Optional()
  @Transform(({ value }) => normalizeCnpj(value), { toPlainOnly: true })
  personCNPJ: string;

  @Optional()
  tradingNamePerson?: string;

  @Optional()
  companyNamePerson: string;

  @Optional()
  @Transform(({ value }: { value: string }) => value.replaceAll(".", ""), {
    toPlainOnly: true,
  })
  stateInscrPerson: string;

  @Optional()
  logo: string;

  @Optional()
  logoFile: Buffer;

  @Optional()
  employeesNumber: number;
}
