import { BaseEntity } from "src/base/baseEnt";
import { MajorJobCategory } from "src/major-job-category/entities/major-job-category.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class JobCategory extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  imagePath: string;

  @Column({ type: "bytea" })
  imageBuffer: Buffer;

  @ManyToOne(() => MajorJobCategory)
  @JoinColumn({ name: "major_job_category_id" })
  majorJobCategory: MajorJobCategory;
}
