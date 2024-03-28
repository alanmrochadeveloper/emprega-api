import { AuthorizedDocuments } from "src/authorized-documents/authorized-documents.entity";
import { BaseEntity } from "src/base/entity.base";
import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { Person } from "src/person/person.entity";
import { Column, Entity, ManyToMany, OneToMany } from "typeorm";

@Entity("company")
export class Company extends BaseEntity {

    @Column({ name: "trading_name", length: 150 })
    tradingName: string;

    @Column({ name: "company_name", length: 150 })
    companyName: string;

    @Column({ name: "state_inscr", length: 12, unique: true })
    stateInscr: string;

    @Column({ name: "cnpj", length: 14, unique: true })
    cnpj: string;

    @OneToMany(() => JobOpportunity, jobOpportunity => jobOpportunity.company)
    jobOpportunities: JobOpportunity[];

    @ManyToMany(() => Person, person => person.companies)
    advertisers: Person[]

    @Column({ type: "varchar", nullable: true })
    logo: string;

    @Column({ name: "logo_file", type: "bytea", nullable: true })
    logoFile: Buffer;

    @OneToMany(() => AuthorizedDocuments, authorizedDocuments => authorizedDocuments.company)
    authorizedDocuments: AuthorizedDocuments[];
}
