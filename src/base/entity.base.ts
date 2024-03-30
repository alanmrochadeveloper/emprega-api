import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    // TODO: figure out how to implement catching user who created, updated and deleted the entity
    // TODO: maybe using a decorator or constructor
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt: Date;
}

