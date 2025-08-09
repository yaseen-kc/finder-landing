import { USER_REVIEWS, type UserReview as Review } from "../../constants/landingPage/userReviewConstants";

export default function UserReview() {
  const review: Review = USER_REVIEWS[0];

  // Split the quote by the first highlight phrase to style it separately
  const highlight = review.highlights?.[0] ?? "";
  const [before, after] = highlight
    ? review.quote.split(highlight)
    : [review.quote, ""];

  return (
    <section className="mx-auto max-w-screen-2xl px-4 py-10">
      <div className="w-full rounded-3xl bg-zinc-200/60 text-zinc-800 px-6 sm:px-10 py-8 sm:py-10 shadow-inner">
        <div className="text-3xl leading-none select-none">“</div>

        <p className="mt-3 text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 md:leading-9 text-zinc-600">
          {before}
          {highlight && (
            <span className="mx-1 font-semibold text-zinc-900">{highlight}</span>
          )}
          {after}
        </p>

        <div className="mt-6 sm:mt-8 text-base sm:text-lg font-semibold text-zinc-900">~ {review.author}</div>
      </div>
    </section>
  );
}

