import { Star } from "lucide-react";

export default function StarRating({
  rating,
}: {
  rating: number | null | undefined;
}) {
  if (rating == null)
    return <span className="text-muted text-sm">No rating</span>;

  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.3;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" title={`${rating} / 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 fill-warning text-warning" />
      ))}
      {hasHalf && (
        <Star
          className="h-4 w-4 text-warning"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-border" />
      ))}
      <span className="ml-1 text-sm text-muted">{rating.toFixed(1)}</span>
    </div>
  );
}
