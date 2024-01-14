import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../person/person.entity";

export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @OneToMany(() => Person, person => person.categoryId)
    people: Person []
    @Column({name: "value", length: 150, type: "enum"})
    value: CategoryEnum

}

enum CategoryEnum {
    Admin,
    Anunciante,
    Candidato
}
