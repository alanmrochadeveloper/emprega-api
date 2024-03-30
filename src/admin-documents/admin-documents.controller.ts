import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';
import { AdminDocuments } from './admin-documents.entity';
import { AdminDocumentsService } from './admin-documents.service';

@Controller('admin-documents')
export class AdminDocumentsController {
    constructor(private readonly adminDocumentsService: AdminDocumentsService,
        private readonly userService: UserService
    ) { }

    @Get()
    getAll() {
        return this.adminDocumentsService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard)
    async addDocument(@Req() request: Request, @Body() document: AdminDocuments) {
        const cookie = request.cookies['jwt']
        const user = await this.userService.getUserByCookie(cookie)
        return this.adminDocumentsService.addDocument(document, user);
    }
}
