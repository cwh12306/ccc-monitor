import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApplicationService } from './application.service';

interface CreateApplicationDto {
    name: string;
    type: 'vanilla' | 'react' | 'vue';
}

// interface DeleteApplicationDto {
//     id: number;
// }

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get()
    async list() {
        return await this.applicationService.list();
    }

    @Post()
    async create(@Body() body: CreateApplicationDto) {
        return await this.applicationService.create(body.name, body.type);
    }
}
