import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company-dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService,
        private readonly userService: UserService,
    ) {

    }

    @Post()
    @UseGuards(AuthGuard)
    async createCompanyForPerson(@Body() companyData: CreateCompanyDto,
        @Req() request: Request
    ) {
        const cookie = request.cookies['jwt']
        const user = await this.userService.getUserByCookie(cookie)
        return await this.companyService.createForPerson(companyData, user);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(
        @Req() request: Request,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('companyName') companyName?: string,
        @Query('cnpj') cnpj?: string,
        @Query('stateInscr') stateInscr?: string,
    ) {
        const cookie = request.cookies['jwt']
        const user = await this.userService.getUserByCookie(cookie)
        limit = limit > 100 ? 100 : limit;
        return this.companyService.findAll({
            user,
            page,
            limit,
            companyName,
            cnpj,
            stateInscr,
        });
    }
}
