import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { Person } from "src/person/person.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("company")
export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "trading_name", length: 150 })
    tradingName: string;

    @Column({ name: "company_name", length: 150 })
    companyName: string;

    @Column({ name: "state_inscr", length: 12 })
    stateInscr: string;

    @Column({ name: "cnpj", length: 14 })
    CNPJ: string;

    @OneToMany(() => JobOpportunity, jobOpportunity => jobOpportunity.company)
    jobOpportunities: JobOpportunity[];

    @ManyToMany(() => Person, person => person)
    advertisers: Person[]

    @Column({ type: "varchar", nullable: true })
    logo: string;

    @Column({ name: "logo_file", type: "bytea", nullable: true })
    logoFile: Buffer;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;
}
