import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

export async function seedOrders() {
    console.log("Seeding orders...");

    // Get existing users and products
    const users = await prisma.user.findMany({ take: 20 });
    const products = await prisma.product.findMany();

    if (users.length === 0 || products.length === 0) {
        console.log("No users or products found. Skipping order seeding.");
        return;
    }

    const statuses = ["pending", "completed", "cancelled", "refunded"] as const;

    // Create 100 sample orders with all fields
    for (let i = 0; i < 100; i++) {
        const user = faker.helpers.arrayElement(users);
        const orderProducts = faker.helpers.arrayElements(products, {
            min: 1,
            max: 5,
        });

        let totalAmount = 0;
        let itemCount = 0;
        const orderProductsData = orderProducts.map((product) => {
            const quantity = faker.number.int({ min: 1, max: 5 });
            const unitPrice = (product.price ?? 0);
            const totalPrice = unitPrice * quantity;
            const imageFromArray = Array.isArray((product as any).imageSrc) ? (product as any).imageSrc[0] : undefined;
            const image = (product as any).variantImage || imageFromArray || faker.image.url();
            totalAmount += totalPrice;
            itemCount += quantity;
            return {
                id: faker.string.uuid(),
                productId: product.id,
                name: (product as any).title || "Untitled Product",
                sku: `SKU-${faker.string.alphanumeric(6).toUpperCase()}`,
                image,
                quantity,
                unitPrice,
                totalPrice,
                createdAt: faker.date.past(),
                updatedAt: faker.date.recent(),
            };
        });

        const orderNumber = `ORD-${faker.date.recent().getTime()}-${faker.string.alphanumeric(4).toUpperCase()}`;
        const status = faker.helpers.arrayElement(statuses);
        const orderDate = faker.date.past({ years: 1 });
        const isCompleted = status === 'completed';
        const isRefunded = status === 'refunded';

        await prisma.order.create({
            data: {
                id: faker.string.uuid(),
                orderNumber,
                userId: user.id,
                customerId: faker.datatype.boolean() ? `CUST-${faker.string.alphanumeric(8)}` : null,
                customerName: user.name,
                customerEmail: user.email,
                customerAvatar: user.profilePic || faker.image.avatar(),
                dateTime: orderDate,
                itemCount,
                totalAmount,
                status,
                consignmentNumber: isCompleted ? `CN-${faker.string.alphanumeric(10)}` : null,
                receipt: `RCPT-${faker.string.alphanumeric(8)}`,
                orderType: faker.helpers.arrayElement(["retail", "wholesale", "subscription"]),
                courierName: isCompleted ? faker.helpers.arrayElement(["FedEx", "UPS", "DHL", "USPS"]) : null,
                dispatchedDate: isCompleted ? faker.date.between({ from: orderDate, to: new Date() }) : null,
                arrivedDate: isCompleted ? faker.date.between({ from: orderDate, to: new Date() }) : null,
                returnedDate: isRefunded ? faker.date.between({ from: orderDate, to: new Date() }) : null,
                returnReachedDate: isRefunded ? faker.date.between({ from: orderDate, to: new Date() }) : null,
                shippingFirstName: faker.person.firstName(),
                shippingLastName: faker.person.lastName(),
                shippingCompany: faker.company.name(),
                shippingAddress: faker.location.streetAddress(),
                shippingApartment: faker.location.secondaryAddress(),
                shippingCity: faker.location.city(),
                shippingCountry: faker.location.country(),
                shippingState: faker.location.state(),
                shippingPostalCode: faker.location.zipCode(),
                shippingPhone: faker.phone.number(),
                shippingEmail: user.email,
                paymentMethod: faker.helpers.arrayElement(["credit_card", "debit_card", "paypal", "razorpay"]),
                paymentCardLast4: faker.finance.creditCardNumber().slice(-4),
                paymentCardBrand: faker.helpers.arrayElement(["visa", "mastercard", "amex"]),
                razorpayOrderId: `order_${faker.string.alphanumeric(14)}`,
                razorpayPaymentId: `pay_${faker.string.alphanumeric(14)}`,
                products: {
                    create: orderProductsData,
                },
                OrderItem: {
                    create: orderProducts.map(product => ({
                        id: faker.string.uuid(),
                        productId: product.id,
                        quantity: faker.number.int({ min: 1, max: 3 }),
                        price: (product.price ?? 0),
                        createdAt: faker.date.past(),
                        updatedAt: faker.date.recent(),
                    }))
                },
                history: {
                    create: [
                        {
                            id: faker.string.uuid(),
                            event: "Order created",
                            createdAt: orderDate,
                        },
                        {
                            id: faker.string.uuid(),
                            event: `Status changed to ${status}`,
                            createdAt: faker.date.between({ from: orderDate, to: new Date() }),
                        },
                        ...(isCompleted ? [{
                            id: faker.string.uuid(),
                            event: "Order shipped",
                            createdAt: faker.date.between({ from: orderDate, to: new Date() }),
                        }] : []),
                        ...(isCompleted ? [{
                            id: faker.string.uuid(),
                            event: "Order delivered",
                            createdAt: faker.date.between({ from: orderDate, to: new Date() }),
                        }] : []),
                        ...(isRefunded ? [{
                            id: faker.string.uuid(),
                            event: "Return requested",
                            createdAt: faker.date.between({ from: orderDate, to: new Date() }),
                        }] : []),
                        ...(isRefunded ? [{
                            id: faker.string.uuid(),
                            event: "Refund processed",
                            createdAt: faker.date.between({ from: orderDate, to: new Date() }),
                        }] : []),
                    ],
                },
                createdAt: orderDate,
                updatedAt: faker.date.recent(),
            },
        });

        // Add small delay to avoid database contention
        if (i % 10 === 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    console.log("Orders seeded successfully!");
}

// Run this if called directly
if (require.main === module) {
    seedOrders()
        .catch((e) => {
            console.error("Error seeding orders:", e);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export default seedOrders;