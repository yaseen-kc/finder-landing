import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Starting product seeding process...");

    const saltRounds = 10;

    // Create sample users with new fields
    console.log("Creating sample users...");
    const sampleUserData = [
        {
            email: "muhdyaseenkc@gmail.com",
            password: await bcrypt.hash("john1234", saltRounds),
            name: "John",
            phone: "9876543210",
            profilePic: faker.image.avatar(),
            dob: faker.date.birthdate({ min: 25, max: 35, mode: 'age' }),
            gender: "Male",
            address: {
                street: "123 Tech Park Road",
                area: "Infopark",
                city: "Kochi",
                state: "Kerala",
                country: "India",
                pincode: "682030",
                landmark: "Near Infopark Metro"
            },
            preferredLanguage: "en",
            ipAddress: faker.internet.ip(),
        },
        {
            email: "janedoe@findersports.com",
            password: await bcrypt.hash("jane1234", saltRounds),
            name: "Jane",
            phone: "9123456789",
            profilePic: faker.image.avatar(),
            dob: faker.date.birthdate({ min: 28, max: 40, mode: 'age' }),
            gender: "Female",
            address: {
                street: "456 MG Road",
                area: "Ernakulam",
                city: "Kochi",
                state: "Kerala",
                country: "India",
                pincode: "682035",
                landmark: "Near Oberon Mall"
            },
            preferredLanguage: "en",
            ipAddress: faker.internet.ip(),
        },
        {
            email: "adminuser@findersports.com",
            password: await bcrypt.hash("admin5678", saltRounds),
            name: "Admin",
            phone: "9000000000",
            profilePic: faker.image.avatar(),
            dob: faker.date.birthdate({ min: 30, max: 45, mode: 'age' }),
            gender: "Male",
            address: {
                street: "789 Admin Colony",
                area: "Kakkanad",
                city: "Kochi",
                state: "Kerala",
                country: "India",
                pincode: "682037",
                landmark: "Near Civil Station"
            },
            preferredLanguage: "en",
            ipAddress: faker.internet.ip(),
        }
    ];

    // Create users with enhanced data
    for (const userData of sampleUserData) {
        await prisma.user.create({
            data: {
                ...userData,
                emailVerified: faker.datatype.boolean(),
                phoneVerified: faker.datatype.boolean(),
                verifiedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }) : null,
                resetPasswordOtp: null,
                resetPasswordOtpExpiresAt: null,
            }
        });
    }

    // Create products aligned with current Product schema
    console.log("Creating products with inventory data...");

    const sportsCategories = [
        "knee-support", "wrist-support", "elbow-support",
        "shoulder-support", "ankle-support", "back-support"
    ];

    const productData = [
        {
            title: "Knee Support for Men & Women",
            price: 499,
            comparePrice: 590,
            body: "Versatile knee support suitable for both men and women, providing excellent support for various knee sizes and shapes. Alleviates discomfort and pain caused by injuries, arthritis, or overuse, enhancing mobility and daily comfort.",
            variantImage: "https://m.media-amazon.com/images/I/51vG5MfDWKL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [
                "https://m.media-amazon.com/images/I/51vG5MfDWKL.jpg",
                "https://m.media-amazon.com/images/I/61P8SScPkCL._SL1003_.jpg",
                "https://m.media-amazon.com/images/I/61LvoY-0XWL._SL1104_.jpg",
                "https://m.media-amazon.com/images/I/71nRh4U5ePL._SL1500_.jpg"
            ],
            tags: ["knee-support", "pain-relief", "sports", "medical", "unisex"].join(","),
            inventoryQty: 420,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
        {
            title: "Wrist Binder",
            price: 429,
            comparePrice: 499,
            body: "Adjustable wrist brace providing durable elastic support and heat retention to alleviate wrist injuries.",
            variantImage: "https://m.media-amazon.com/images/I/61dzQ9Fy-dL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [
                "https://m.media-amazon.com/images/I/61dzQ9Fy-dL._SL1443_.jpg",
                "https://m.media-amazon.com/images/I/61Ls7l44VIL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71vYkfNTK9L._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/61NJictK0SL._SL1443_.jpg"
            ],
            tags: ["wrist-support", "adjustable", "sports", "medical"].join(","),
            inventoryQty: 257,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
        {
            title: "Knee Brace Neoprene",
            price: 499,
            comparePrice: 590,
            body: "Neoprene knee brace providing stability and support, reducing the risk of injury or strain during physical activities.",
            variantImage: "https://m.media-amazon.com/images/I/718g94jOeDL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [
                "https://m.media-amazon.com/images/I/718g94jOeDL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71GUDc1aeEL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/71HhJ6YxNSL._SL1500_.jpg",
                "https://m.media-amazon.com/images/I/61mvi6N3ZXL._SL1500_.jpg"
            ],
            tags: ["knee-support", "neoprene", "sports", "stability"].join(","),
            inventoryQty: 288,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
        {
            title: "Knee Support Double Strap",
            price: 520,
            comparePrice: 590,
            body: "Adjustable double strap knee support made of high-quality neoprene, providing stability and support to the knee joint.",
            variantImage: "https://m.media-amazon.com/images/I/41XQb6OdlZL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [],
            tags: ["knee-support", "double-strap", "neoprene", "adjustable", "premium"].join(","),
            inventoryQty: 166,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
        {
            title: "Elbow Brace Neoprene",
            price: 449,
            comparePrice: 499,
            body: "Neoprene elbow brace helping to reduce pain and inflammation, suitable for various sports and daily care.",
            variantImage: "https://m.media-amazon.com/images/I/51vG5MfDWKL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [
                "https://m.media-amazon.com/images/I/41XQb6OdlZL.jpg",
                "https://m.media-amazon.com/images/I/61JsOwgtp0L.jpg",
                "https://m.media-amazon.com/images/I/61mzrkQIr+L.jpg",
                "https://m.media-amazon.com/images/I/51l5-lXyWSL.jpg"
            ],
            tags: ["elbow-support", "neoprene", "anti-inflammatory", "sports"].join(","),
            inventoryQty: 293,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
        {
            title: "Shoulder Support",
            price: 699,
            comparePrice: 799,
            body: "Shoulder support brace providing stability and support, aiding in pain relief and posture correction.",
            variantImage: "https://m.media-amazon.com/images/I/61o2IvgH3hL._AC_CR0%2C0%2C0%2C0_SX615_SY462_.jpg",
            imageSrc: [
                "https://m.media-amazon.com/images/I/61o2IvgH3hL._SL1443_.jpg",
                "https://m.media-amazon.com/images/I/61VrE5IkMkL._SL1443_.jpg",
                "https://m.media-amazon.com/images/I/61o75hjQAEL._SL1443_.jpg",
                "https://m.media-amazon.com/images/I/618mDK8oHKL._SL1443_.jpg"
            ],
            tags: ["shoulder-support", "posture-correction", "premium", "medical"].join(","),
            inventoryQty: 126,
            sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
            published: true,
            intlIncluded: true,
            status: "active",
        },
    ];

    // Create products aligned with Product schema (populate all fields)
    for (const product of productData) {
        const title = product.title;
        const body = product.body ?? "";
        const basePrice = product.price ?? 0;
        const comparePrice = product.comparePrice ?? Math.max(basePrice, basePrice + 50);

        await prisma.product.create({
            data: {
                // Required/autogenerated
                handle: title.toLowerCase().replace(/\s+/g, "-") + "-" + faker.string.alphanumeric(4).toLowerCase(),

                // Basic info
                title,
                body,
                vendor: faker.company.name(),
                category: faker.helpers.arrayElement(sportsCategories),
                type: faker.helpers.arrayElement(["support", "brace", "accessory", "medical"]),
                tags: product.tags,
                published: product.published,
                options: [
                    { name: "Size", values: ["S", "M", "L", "XL"] },
                    { name: "Color", values: ["Black", "Blue", "Gray"] },
                ],
                sku: product.sku,
                grams: faker.number.int({ min: 150, max: 650 }),
                inventoryTracker: faker.helpers.arrayElement(["internal", "shopify", "manual"]),
                inventoryQty: product.inventoryQty,
                inventoryPolicy: faker.helpers.arrayElement(["continue", "deny"]),
                fulfillmentService: faker.helpers.arrayElement(["manual", "shipwire", "dropship"]),

                // Pricing
                price: basePrice,
                comparePrice,
                requiresShipping: true,
                taxable: true,
                cost: Number((basePrice * 0.6).toFixed(2)),

                // Identification & media
                barcode: faker.string.alphanumeric(12).toUpperCase(),
                imageSrc: product.imageSrc,
                imageAlt: `Image of ${title}`,
                variantImage: product.variantImage,

                // Gift and SEO
                giftCard: false,
                seoTitle: title,
                seoDescription: body.slice(0, 150),

                // Google Shopping metadata
                googleCategory: "Sporting Goods",
                googleGender: "unisex",
                googleAgeGroup: "adult",
                googleMPN: `MPN-${faker.string.alphanumeric(8).toUpperCase()}`,
                googleCondition: "new",
                googleCustomProduct: "false",

                // Tax/weight
                weightUnit: faker.helpers.arrayElement(["g", "kg"]),
                taxCode: faker.helpers.arrayElement(["GST-18", "GST-12", "GST-5"]),

                // Regional pricing flags
                usIncluded: faker.datatype.boolean(),
                usPrice: Number((basePrice * 1.05).toFixed(2)),
                usComparePrice: Number((comparePrice * 1.05).toFixed(2)),
                intlIncluded: product.intlIncluded,
                intlPrice: Number((basePrice * 0.95).toFixed(2)),
                intlComparePrice: Number((comparePrice * 0.95).toFixed(2)),

                // Status
                status: product.status,
            },
        });
    }

    // Create shopping cart for test user
    console.log("Creating sample shopping cart...");
    const user = await prisma.user.findUnique({
        where: { email: "muhdyaseenkc@gmail.com" },
    });

    if (user) {
        // Get first 3 products for cart
        const products = await prisma.product.findMany({ take: 3 });

        await prisma.cart.create({
            data: {
                userId: user.id,
                items: {
                    create: [
                        {
                            productId: products[0].id,
                            quantity: 2, // Popular knee support
                        },
                        {
                            productId: products[1].id,
                            quantity: 1, // Wrist binder
                        },
                        {
                            productId: products[2]?.id || products[0].id, // Fallback to first product if less than 3
                            quantity: 1,
                        },
                    ],
                },
            },
        });
    }

    console.log("Products and cart seeded successfully!");
}

main()
    .catch((e) => {
        console.error("Error in product seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });