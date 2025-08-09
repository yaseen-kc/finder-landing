type Color = { id: string; name: string; swatch: string };

export default function ColorSelector({ colors, activeName }: { colors: Color[]; activeName?: string }) {
  return (
    <div>
      <div className="mb-2 text-sm text-gray-600">
        Color: <span className="font-medium">{activeName ?? colors[0]?.name}</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            className="h-10 w-10 rounded-full border border-gray-300"
            style={{ backgroundColor: color.swatch }}
            aria-label={color.name}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}


