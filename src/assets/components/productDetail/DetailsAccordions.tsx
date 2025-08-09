export default function DetailsAccordions({
  description,
  productDetails,
  careInstructions,
  returns,
}: {
  description: string[];
  productDetails: string[];
  careInstructions: string[];
  returns: string[];
}) {
  return (
    <div className="space-y-3">
      <details className="rounded-2xl border p-4" open>
        <summary className="cursor-pointer text-sm font-semibold">Description</summary>
        <div className="mt-2 space-y-2 text-sm text-gray-700">
          {description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </details>
      <details className="rounded-2xl border p-4">
        <summary className="cursor-pointer text-sm font-semibold">Product Details</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {productDetails.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </details>
      <details className="rounded-2xl border p-4">
        <summary className="cursor-pointer text-sm font-semibold">Care Instruction</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {careInstructions.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </details>
      <details className="rounded-2xl border p-4">
        <summary className="cursor-pointer text-sm font-semibold">Return and Refund</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
          {returns.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}


