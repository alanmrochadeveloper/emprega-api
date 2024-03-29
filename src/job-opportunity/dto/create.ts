import { ModelEnum } from "../jobOpportunity.entity";

export class CreateJobOpportunityDto {
    companyId: string;
    title: string;
    description: string;
    requirements: string;
    salary: number;
    location: string;
    benefits: string;
    salaryRange: { min: number, max: number };
    salaryToBeAgreed: boolean;
    model: ModelEnum;
    isActive: boolean;
    jobCategoryId: string;
}

