import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Company {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({name:"trading_name", length: 150})
    tradingName: string; // nome fantasia
    @Column({name: "company_name", length: 150})
    companyName: string; // Razão social
}
