import { Exclude } from "class-transformer";
import { BaseEntity } from "src/base/entity.base";
import { Person } from "src/person/person.entity";
import {
  AfterInsert,
  BeforeInsert,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity("user")
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: "boolean", default: false, name: "email_confirmed" })
  emailConfirmed: boolean;

  @Column({ type: "varchar", nullable: true, name: "confirmation_token" })
  confirmationToken: string;

  @Column({ type: "timestamptz", nullable: true, name: "token_expires_date" })
  tokenExpiresDate: Date;

  @Column({ type: "varchar", nullable: true })
  avatar: string;

  @Column({ type: "bytea", nullable: true, name: "avatar_file" })
  avatarFile: Buffer;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => Person)
  @JoinColumn({ name: "person_id" })
  person: Person;

  @BeforeInsert()
  beforeInsert() {
    console.log(`Criando usuário ${this.email} ...`);
  }

  @AfterInsert()
  afterInsert() {
    console.log(`Usuario foi criado com sucesso, id ${this.id}`);
  }
}
