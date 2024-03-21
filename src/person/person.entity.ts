import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity("person")
export class Person {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "first_name", length: 100 })
    firstName: string;

    @Column({ name: "last_name", length: 250 })
    lastName: string;

    @Column({ name: "address", length: 250 })
    address: string;

    @Column({ name: "CPF", length: 11 })
    CPF: string;

    @Column({ name: "RG", length: 11, nullable: true })
    RG?: string;

    @Column({ name: "phonenumber", length: 50 })
    phoneNumber: string;

    @Column({ name: "phonenumber2", nullable: true, length: 50 })
    phoneNumber2: string;

    @ManyToOne(() => Category, category => category.id)
    categoryId: string;

    @OneToOne(() => User, user => user)
    user: User
}
