import { BaseEntity } from "src/base/baseEnt";
import { Company } from "src/company/company.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum AuthorizedDocumentsStatus {
  PENDING = "pending",
  ALLOWED = "allowed",
  DENIED = "denied",
}

enum DocumentTypeEnum {
  CPF = "cpf",
  CNPJ = "cnpj",
}

@Entity("authorized_documents")
export class AuthorizedDocuments extends BaseEntity {
  @Column({
    enum: AuthorizedDocumentsStatus,
    type: "enum",
    default: AuthorizedDocumentsStatus.PENDING,
  })
  status: AuthorizedDocumentsStatus;

  @Column()
  document: string;

  @Column({
    type: "enum",
    enum: DocumentTypeEnum,
  })
  documentType: DocumentTypeEnum;

  @ManyToOne(() => Company)
  @JoinColumn({ name: "company_id" })
  company: Company;
}
