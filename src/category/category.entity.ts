import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @OneToMany(() => Person, person => person.category)
    people: Person[]

    @Column({ name: "value", type: "enum", enum: CategoryEnum })
    value: CategoryEnum

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

