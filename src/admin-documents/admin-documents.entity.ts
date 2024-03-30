import { BaseEntity } from "src/base/entity.base";
import { Column, Entity } from "typeorm";

@Entity()
export class AdminDocuments extends BaseEntity {
    @Column()
    value: string
}

