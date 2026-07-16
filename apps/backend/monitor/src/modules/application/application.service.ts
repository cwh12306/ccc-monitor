import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Application } from '@/entities/Application';

@Injectable()
export class ApplicationService {
    constructor(@InjectRepository(Application) private readonly applicationRepository: Repository<Application>) {}
    async list() {
        const res = await this.applicationRepository.findAndCount({
            where: {
                is_deleted: false,
            },
        });
        return {
            data: res[0],
            total: res[1],
        };
    }

    async create(name: string, type: 'vanilla' | 'react' | 'vue') {
        const application = new Application();
        application.name = name;
        application.type = type;
        return await this.applicationRepository.save(application);
    }
}
