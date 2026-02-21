import Link from "next/link";
import StarRating from "./StarRating";
import { BookOpen } from "lucide-react";

interface BookCardProps {
  id: number;
  title: string;
  author: { id: number; firstName: string; lastName: string };
  genre: { name: string };
  rating?: number | null;
  coverImageUrl?: string | null;
  pageCount?: number;
}

export default function BookCard({
  id,
  title,
  author,
  genre,
  rating,
  coverImageUrl,
  pageCount,
}: BookCardProps) {
  return (
    <Link
      href={`/books/${id}`}
      className="group bg-surface rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-200"
    >
      {/* Cover image area */}
      <div className="h-48 bg-linear-to-br from-primary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        ) : (
          <BookOpen className="h-16 w-16 text-primary/30" />
        )}
        <span className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-medium px-2 py-1 rounded-full">
          {genre.name}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-muted">
          by {author.firstName} {author.lastName}
        </p>
        <div className="flex items-center justify-between">
          <StarRating rating={rating} />
          {pageCount != null && (
            <span className="text-xs text-muted">{pageCount} pp</span>
          )}
        </div>
      </div>
    </Link>
  );
}
