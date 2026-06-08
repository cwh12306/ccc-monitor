import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
    constructor() {}
    list(): string {
        return 'list';
    }
}
