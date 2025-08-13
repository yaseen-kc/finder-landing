export type UserReview = {
    id: string;
    quote: string;
    author: string;
    highlights?: string[]; // phrases in the quote to emphasize
};

export const USER_REVIEWS: UserReview[] = [
    {
        id: "ganesh-quote",
        quote:
            "Empowers you to make a difference in people's lives while building your success, because that's what great partnerships do.",
        author: "Ganesh Sonawane",
        highlights: ["make a difference in people's lives"],
    },
];

export const USER_REVIEW_STRINGS = {
  QUOTE_MARK: "“",
  AUTHOR_PREFIX: "~ ",
} as const;


