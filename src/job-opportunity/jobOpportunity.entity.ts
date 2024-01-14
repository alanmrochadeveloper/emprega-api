import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("job_opportunity")
export class JobOpportunity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
