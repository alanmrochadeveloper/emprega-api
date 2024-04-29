import { BaseEntity } from "src/base/baseEnt";
import { JobCategory } from "src/job-category/job-category.entity";
import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";

export enum MajorJobCategoryEnum {
  Administrativo = "Administrativo",
  Comercial = "Comercial",
  Financeiro = "Financeiro",
  Recursos_Humanos = "Recursos Humanos",
  Tecnologia = "Tecnologia",
  Marketing = "Marketing",
  Servicos_Gerais = "Serviços Gerais",
  Saude = "Saúde",
  Educacao = "Educação",
  Engenharia = "Engenharia",
  Juridico = "Jurídico",
}

@Entity("major_job_category")
export class MajorJobCategory extends BaseEntity {
  @Column({ type: "enum", enum: MajorJobCategoryEnum })
  value: MajorJobCategoryEnum;

  @Column({ nullable: true })
  imagePath: string;

  @Column({ type: "bytea", nullable: true })
  imageBuffer: Buffer;

  @OneToMany(() => JobCategory, (jobCategory) => jobCategory.majorJobCategory)
  jobCategories: JobCategory[];
}
