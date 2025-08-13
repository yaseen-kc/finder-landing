import type { ProductFeature } from '@productDetailConstant';

export default function FeatureGrid({ features }: { features: ProductFeature[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {features.map((f) => (
        <div key={f.id} className="flex items-start gap-2 rounded-xl border border-gray-200 p-3">
          {/* <div className="mt-1 h-5 w-5 rounded bg-gray-100" /> */}
          <p className="text-sm text-gray-700">{f.text}</p>
        </div>
      ))}
    </div>
  );
}


