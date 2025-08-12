export type UserReview = {
    id: string;
    quote: string;
    author: string;
    highlights?: string[]; // phrases in the quote to emphasize
};

export const USER_REVIEWS: UserReview[] = [
    {
        id: "elliot-anderson",
        quote:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et",
        author: "Elliot Anderson",
        highlights: ["magnis dis parturient montes, nascetur ridiculus mus."],
    },
];

export const USER_REVIEW_STRINGS = {
    QUOTE_MARK: "“",
    AUTHOR_PREFIX: "~ ",
} as const;


