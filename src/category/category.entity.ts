import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum CategoryEnum {
    Admin = "Admin",
    Anunciante = "Anunciante",
    Candidato = "Candidato"
}

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true, name: "value", type: "enum", enum: CategoryEnum })
    value: CategoryEnum

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;
}

