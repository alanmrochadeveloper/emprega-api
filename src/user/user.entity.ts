import { Exclude } from "class-transformer";
import { Person } from "src/person/person.entity";
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: "varchar", nullable: true })
    avatar: string;

    @Exclude()
    @Column()
    password: string;

    @OneToOne(() => Person)
    @JoinColumn({ name: "person_id" })
    person: Person;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;

    @BeforeInsert()
    beforeInsert() {
        console.log(`Criando usuário ${this.email} ...`)
    }

    @AfterInsert()
    afterInsert() {
        console.log(`Usuario foi criado com sucesso, id ${this.id}`)
    }

}

