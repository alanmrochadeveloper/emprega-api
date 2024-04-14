import { BaseEntity } from "src/base/entity.base";
import { Column, Entity } from "typeorm";

@Entity()
export class AdminEmail extends BaseEntity {
  @Column()
  email: string;

  @Column({ default: false })
  confirmed: boolean;
}
