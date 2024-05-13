import { BaseEntity } from "src/base/baseEnt";
import { JobOpportunity } from "src/job-opportunity/jobOpportunity.entity";
import { Person } from "src/person/person.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

export enum ApplicationStatusEnum {
  APLICADO = "aplicado",
  REJEITADO = "rejeitado", // TODO: translate this to concluded
  ENTREVISTADO = "entrevistado",
  OFERTADO = "ofertado",
  CONVIDADO = "convidado",
  CONTRATADO = "contratado", // TODO: translate this to concluded
  CANCELADO = "cancelado",
}

@Entity("job_application")
export class JobApplication extends BaseEntity {
  @ManyToOne(() => JobOpportunity)
  @JoinColumn({ name: "job_opportunity_id" })
  jobOpportunity: JobOpportunity;

  @ManyToOne(() => Person)
  @JoinColumn({ name: "person_id" })
  person: Person;

  @Column({ type: "enum", enum: ApplicationStatusEnum })
  applicationStatus: ApplicationStatusEnum;
}
