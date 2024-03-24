import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    jobOpportunity: JobOpportunity[];

    @Column({ type: "varchar", nullable: true })
    logo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
