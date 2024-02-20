import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../person/person.entity";

enum CategoryEnum {
    Admin,
    Anunciante,
    Candidato
}

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @OneToMany(() => Person, person => person.categoryId)
    people: Person[]
    @Column({ name: "value", type: "enum", enum: CategoryEnum })
    value: CategoryEnum

}

