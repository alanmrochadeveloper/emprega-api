import { BaseEntity } from "src/base/entity.base";
import { Column, Entity } from "typeorm";

export enum CategoryEnum {
    Admin = "Admin",
    Anunciante = "Anunciante",
    Candidato = "Candidato"
}

@Entity("category")
export class Category extends BaseEntity {

    @Column({ unique: true, name: "value", type: "enum", enum: CategoryEnum })
    value: CategoryEnum

}

