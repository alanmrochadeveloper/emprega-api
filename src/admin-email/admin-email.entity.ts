import { BaseEntity } from "src/base/baseEnt";
import { Column, Entity } from "typeorm";

@Entity("admin_email")
export class AdminEmail extends BaseEntity {
  @Column()
  email: string;
}
