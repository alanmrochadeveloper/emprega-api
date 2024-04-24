import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEmail } from "./admin-email.entity";

@Injectable()
export class AdminEmailService {
  constructor(
    @InjectRepository(AdminEmail)
    private readonly adminEmailRepository: Repository<AdminEmail>
  ) {}

  async isAdmin(email: string) {
    const adminEmail = await this.adminEmailRepository.findOneBy({
      email: email,
    });
    return adminEmail != null;
  }
}
