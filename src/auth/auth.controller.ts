import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    @Post("admin/register")
    register(@Body() body: RegisterDTO) {
        return body;
    }
}
