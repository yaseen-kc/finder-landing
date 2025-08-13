export default function ShippingBadges({
  badges,
}: {
  badges: { id: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((b) => (
        <div
          key={b.id}
          className="flex flex-col items-center justify-center gap-1 rounded-2xl border p-4 text-center text-sm text-gray-700"
        >
          <span>{b.label}</span>
        </div>
      ))}
    </div>
  );
}
