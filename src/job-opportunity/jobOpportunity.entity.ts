import { Company } from "src/company/company.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum ModelEnum {
    REMOTE = "remote",
    HYBRID = "hybrid",
    ON_SITE = "on_site"
}

@Entity("job_opportunity")
export class JobOpportunity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text", nullable: false, length: 1000 })
    description: string;

    @Column({ type: "text", nullable: false, length: 1000 })
    requirements: string;

    @Column({ type: "text", nullable: false, length: 1000 })
    benefits: string;

    @Column({ type: "decimal", nullable: false, precision: 10, scale: 2 })
    salary: number;

    @Column({ type: "boolean", nullable: false, default: false })
    isSalaryToBeAgreed: boolean;

    @Column({ type: "enum", nullable: false, default: ModelEnum.ON_SITE, enum: ModelEnum })
    model: ModelEnum;

    @Column({ type: "boolean", nullable: false, default: false })
    isActive: boolean;

    @ManyToOne(() => Company, company => company.jobOpportunity)
    company: Company;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
