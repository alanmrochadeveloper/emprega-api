import { BaseEntity } from "src/base/entity.base";
import { Column, Entity } from "typeorm";

@Entity("admin_email")
export class AdminEmail extends BaseEntity {
  @Column()
  email: string;
}
