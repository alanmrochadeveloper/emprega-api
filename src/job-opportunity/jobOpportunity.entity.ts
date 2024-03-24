import { Company } from "src/company/company.entity";
import { Person } from "src/person/person.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum ModelEnum {
    REMOTE = "remote",
    HYBRID = "hybrid",
    ON_SITE = "on_site"
}

@Entity("job_opportunity")
export class JobOpportunity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    description: string;

    @Column({ type: "varchar", nullable: false })
    requirements: string;

    @Column({ type: "varchar", nullable: false })
    benefits: string;

    @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
    salary: number;

    @Column({ type: "boolean", nullable: false, default: false })
    isSalaryToBeAgreed: boolean;

    @Column({ type: "enum", nullable: false, default: ModelEnum.ON_SITE, enum: ModelEnum })
    model: ModelEnum;

    @Column({ type: "boolean", nullable: false, default: false })
    isActive: boolean;

    @ManyToMany(() => Person, person => person.jobOpportunities)
    applicants: Person[]

    @ManyToOne(() => Company, company => company.jobOpportunities)
    @JoinColumn({ name: "company_id" })
    company: Company;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;
}
