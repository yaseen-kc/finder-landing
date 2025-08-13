import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { seedOrders } from "./orderSeed";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    // Hash passwords for seed users
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    const hashedPassword2 = await bcrypt.hash("Manager@123", 10);
    const hashedPassword3 = await bcrypt.hash("Support@123", 10);

    // Create seed admin users with all fields
    await prisma.adminUser.createMany({
        data: [
            {
                id: faker.string.uuid(),
                email: "admin@findersports.com",
                password: hashedPassword,
                name: "Super Admin",
                firstName: "Super",
                lastName: "Admin",
                profilePhoto: faker.image.avatar(),
                country: faker.location.country(),
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                postalCode: faker.location.zipCode(),
                role: "SUPER_ADMIN",
                isActive: true,
                lastLoginAt: faker.date.recent(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
            {
                id: faker.string.uuid(),
                email: "manager@findersports.com",
                password: hashedPassword2,
                name: "Product Manager",
                firstName: "Product",
                lastName: "Manager",
                profilePhoto: faker.image.avatar(),
                country: faker.location.country(),
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                postalCode: faker.location.zipCode(),
                role: "PRODUCT_MANAGER",
                isActive: true,
                lastLoginAt: faker.date.recent(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
            {
                id: faker.string.uuid(),
                email: "agent@findersports.com",
                password: hashedPassword3,
                name: "Support Agent",
                firstName: "Support",
                lastName: "Agent",
                profilePhoto: faker.image.avatar(),
                country: faker.location.country(),
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                postalCode: faker.location.zipCode(),
                role: "SUPPORT_AGENT",
                isActive: true,
                lastLoginAt: faker.date.recent(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            },
        ],
        skipDuplicates: true,
    });

    // Create regular users with all fields
    const userPassword = await bcrypt.hash("user123", 10);
    await prisma.user.createMany({
        data: Array.from({ length: 20 }, () => {
            const verificationToken = faker.string.alphanumeric(32);
            const verificationTokenExpiresAt = faker.date.future();
            const resetPasswordOtp = faker.string.numeric(6);
            const resetPasswordOtpExpiresAt = faker.date.future();

            return {
                id: faker.string.uuid(),
                email: faker.internet.email(),
                password: userPassword,
                name: faker.person.fullName(),
                phone: faker.phone.number(),
                emailVerified: faker.datatype.boolean(),
                phoneVerified: faker.datatype.boolean(),
                verifiedAt: faker.date.past(),
                verificationToken,
                verificationTokenExpiresAt,
                resetPasswordOtp,
                resetPasswordOtpExpiresAt,
                profilePic: faker.image.avatar(),
                dob: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
                gender: faker.helpers.arrayElement(['male', 'female', 'other']),
                address: {
                    street: faker.location.streetAddress(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    country: faker.location.country(),
                    postalCode: faker.location.zipCode(),
                },
                preferredLanguage: faker.helpers.arrayElement(['en', 'fr', 'es', 'de']),
                ipAddress: faker.internet.ip(),
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            };
        }),
        skipDuplicates: true,
    });

    // Create verification attempts
    const users = await prisma.user.findMany({ take: 10 });
    await prisma.verificationAttempt.createMany({
        data: users.map(user => ({
            email: user.email,
            type: faker.helpers.arrayElement(['email_verification', 'password_reset']),
            createdAt: faker.date.past(),
            expiresAt: faker.date.future(),
        })),
    });

    // Seed orders
    await seedOrders();

    console.log("All seed data created successfully");
}

main()
    .catch((e) => {
        console.error("Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });