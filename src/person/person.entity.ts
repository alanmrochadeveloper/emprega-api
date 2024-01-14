import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity("person")
export class Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({name: "first_name", length: 100})
    firstName: string;

    @Column({name: "last_name", length: 250})
    lastName: string;

    @Column({name: "address", length: 250})
    address: string;

    @Column({name: "CPF", length: 11})
    CPF: string;

    @Column({name: "RG", length: 11, nullable: true})
    RG?: string;

    @Column({name: "phonenumber", length: 50})
    PhoneNumber: string;

    @Column({name: "phonenumber2", length: 50})
    PhoneNumber2: string;

    @ManyToOne(() => Category, category => category.id)
    categoryId: string;
}

class Category {
    @PrimaryGeneratedColumn("uuid");
    id: string;
    @OneToMany(() => Person, person => person.categoryId)
    people: Person []
}
