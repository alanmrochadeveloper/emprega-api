import { BaseEntity } from "src/base/entity.base";
import { Column, Entity } from "typeorm";

@Entity()
export class JobCategory extends BaseEntity {
    @Column()
    name: string;
}

