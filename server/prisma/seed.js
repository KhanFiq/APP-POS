import {PrismaClient} from '@prisma/client';
import {encrypt} from '../src/utils/bcrypt.js';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.users.upsert({
        where: { username: 'alice' },
        update: {},
        create: {
            username: 'alice',
            password: encrypt('password'),
            role: 'Manager'
        }
    });

    await prisma.users.upsert({
        where: { username: 'bob' },
        update: {},
        create: {
            username: 'bob',
            password: encrypt('password'),
            role: 'Admin'
        }
    });

    await prisma.users.upsert({
        where: { username: 'alex' },
        update: {},
        create: {
            username: 'alex',
            password: encrypt('password'),
            role: 'Staff'
        },
    });
};
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });
