import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ name: "trading_name", length: 150 })
    tradingName: string; // nome fantasia
    @Column({ name: "company_name", length: 150 })
    companyName: string; // Razão social

    @OneToMany(() => JobOpportunity, jobOpportunity => jobOpportunity.company)
    jobOpportunity: JobOpportunity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
