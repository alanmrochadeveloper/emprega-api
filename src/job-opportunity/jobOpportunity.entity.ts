import { BaseEntity } from "src/base/baseEnt";
import { Company } from "src/company/company.entity";
import { JobCategory } from "src/job-category/job-category.entity";
import { Person } from "src/person/person.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

export enum ModelEnum {
  REMOTE = "remote",
  HYBRID = "hybrid",
  ON_SITE = "on_site",
}

@Entity("job_opportunity")
export class JobOpportunity extends BaseEntity {
  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", nullable: false })
  requirements: string;

  @Column({ type: "varchar", nullable: false })
  location: string;

  @Column({ type: "varchar", nullable: false })
  benefits: string;

  @Column({ type: "decimal", nullable: true, precision: 10, scale: 2 })
  salary: number;

  @Column({ name: "salary_range", type: "json", nullable: true })
  salaryRange: { min: number; max: number };

  @Column({
    name: "is_salary_to_be_agreed",
    type: "boolean",
    nullable: false,
    default: false,
  })
  isSalaryToBeAgreed: boolean;

  @Column({
    type: "enum",
    nullable: false,
    default: ModelEnum.ON_SITE,
    enum: ModelEnum,
  })
  model: ModelEnum;

  @ManyToMany(() => Person, (person) => person.jobOpportunities)
  applicants: Person[];

  //TODO: application logs table should be created here

  @ManyToOne(() => Company, (company) => company.jobOpportunities)
  @JoinColumn({ name: "company_id" })
  company: Company;

  @ManyToOne(() => JobCategory)
  @JoinColumn({ name: "category_id" })
  jobCategory: JobCategory;
}
