import { Company } from "src/company/company.entity";
import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { User } from "src/user/user.entity";
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../category/category.entity";

export enum EnumPersonType {
    Fisica = "Física",
    Juridica = "Jurídica"
}

@Entity("person")
export class Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "first_name", length: 100, nullable: true })
    firstName: string;

    @Column({ name: "last_name", length: 250, nullable: true })
    lastName: string;

    @Column({ name: "address", length: 250 })
    address: string;

    @Column({ name: "cpf", length: 11, nullable: true, unique: true })
    cpf: string;

    @Column({ name: "cnpj", length: 14, nullable: true, unique: true })
    cnpj: string;

    @Column({ name: "trading_name", length: 150, nullable: true })
    tradingName: string;

    @Column({ name: "company_name", length: 150, nullable: true })
    companyName: string;

    @Column({ name: "state_inscr", length: 12, unique: true, nullable: true })
    stateInscr: string;

    @Column({ name: "rg", length: 11, nullable: true, unique: true })
    rg?: string;

    @Column({ enum: EnumPersonType, enumName: "PersonType" })
    type: EnumPersonType;

    @Column({ name: "phonenumber", length: 50 })
    phoneNumber: string;

    @Column({ name: "phonenumber2", nullable: true, length: 50 })
    phoneNumber2: string;

    @Column({ name: "resume_file_path", nullable: true, type: "varchar", length: 255 })
    resumeFilePath: string;

    @Column({ name: "resume_file_blob", nullable: true, type: "bytea" })
    resumeFileBlob: Buffer;

    @ManyToMany(() => JobOpportunity, jobOpportunity => jobOpportunity.applicants)
    @JoinTable({ name: "person_job_opportunity", joinColumn: { name: "person_id" }, inverseJoinColumn: { name: "job_opportunity_id" } })
    jobOpportunities: JobOpportunity[]

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => Company, company => company.advertisers)
    @JoinTable({ name: "person_company", inverseJoinColumn: { name: "company_id", }, joinColumn: { name: "person_id" } })
    companies: Company[]

    @OneToOne(() => User)
    user: User

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;

    @BeforeInsert()
    beforeInsert() {
        console.log(`Criando uma Pessoa ${this.type} ${this.firstName ?? this.companyName ?? "Não informado"} ${this.lastName ?? this.tradingName ?? "Não informado"}, documento:  ${this.cpf ?? this.cnpj ?? "Não informado"} do tipo: ${this.category.value.toLocaleLowerCase()} ...`)
    }

    @AfterInsert()
    afterInsert() {
        console.log(`Pessoa criada com sucesso, id ${this.id}`)
    }
}
