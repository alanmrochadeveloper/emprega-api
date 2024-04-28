import { BaseEntity } from "src/base/baseEnt";
import { Column, Entity } from "typeorm";

@Entity()
export class AdminDocuments extends BaseEntity {
  @Column()
  value: string;
}
