import { useState } from "react";
import type { ProductVariantOption } from "@productDetailConstant";

function Card({
  option,
  selected,
  onSelect,
  thumbnailSrc,
}: {
  option: ProductVariantOption;
  selected: boolean;
  onSelect: () => void;
  thumbnailSrc?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative rounded-xl border p-3 text-left transition-colors ${
        selected
          ? "border-gray-900 bg-white shadow-sm"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded bg-gray-100">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`${option.label} package thumbnail`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-100" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{option.label}</span>
          <span className="text-sm font-semibold">
            ₹{option.price?.toLocaleString()}
          </span>
          {option.compareAtPrice && (
            <span className="text-xs text-gray-400 line-through">
              ₹{option.compareAtPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default function PackageSelector({
  options,
  defaultId,
  onChange,
  thumbnailSrc,
}: {
  options: ProductVariantOption[];
  defaultId?: string;
  onChange?: (id: string) => void;
  thumbnailSrc?: string;
}) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultId ?? options[0]?.id
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onChange?.(id);
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2 text-sm text-gray-600">
        <span>Package:</span>
        <span className="font-medium">
          {options.find((p) => p.id === selectedId)?.label} Cushions
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => (
          <Card
            key={opt.id}
            option={opt}
            selected={opt.id === selectedId}
            onSelect={() => handleSelect(opt.id)}
            thumbnailSrc={thumbnailSrc}
          />
        ))}
      </div>
    </div>
  );
}
