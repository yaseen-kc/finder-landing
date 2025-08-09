import { useMemo, useState } from 'react';
import type { ProductImage } from '@productDetailConstant';

function Thumb({ image, isActive, onClick }: { image: ProductImage; isActive: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-14 w-14 shrink-0 overflow-hidden rounded-md border ${
        isActive ? 'border-gray-900' : 'border-gray-200'
      }`}
    >
      <img src={image.thumb ?? image.src} alt={image.alt} className="h-full w-full object-cover" />
    </button>
  );
}

export default function Gallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useMemo(() => images[activeIndex], [images, activeIndex]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse lg:items-start">
      {/* Main image */}
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-50 lg:flex-1">
        <img src={active.src} alt={active.alt} className="h-full w-full object-cover" />
      </div>

      {/* Thumbnails: horizontal scroll on mobile/half-desktop, vertical on large */}
      <div className="no-scrollbar -mx-1 flex gap-3 overflow-x-auto px-1 lg:mx-0 lg:h-[520px] lg:w-20 lg:flex-col lg:overflow-y-auto lg:px-0">
        {images.map((img, i) => (
          <Thumb key={img.id} image={img} isActive={i === activeIndex} onClick={() => setActiveIndex(i)} />)
        )}
      </div>
    </div>
  );
}


