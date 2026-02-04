import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DatabaseSeedService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async onModuleInit() {
        const existingUser = await this.usersRepository.findOne({
            where: { name: 'Sara John' },
        });

        if (!existingUser) {
            const user = this.usersRepository.create({
                name: 'Sara John',
            });

            await this.usersRepository.save(user);
            console.log('Seeded default user: Sara John');
        } else {
            console.log('Default user already exists');
        }
    }
}
