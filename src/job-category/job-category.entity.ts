import { BaseEntity } from "src/base/baseEnt";
import { Column, Entity } from "typeorm";

@Entity()
export class JobCategory extends BaseEntity {
  @Column()
  name: string;
}
