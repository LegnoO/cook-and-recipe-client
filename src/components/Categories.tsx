// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Types
type Props = { category: Category };

export default function RecipeCategories({ category }: Props) {
  return (
    <Link href={`/recipes/category?=${category.id}`}>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={176}
          height={176}
          className="rounded-full shadow-light-circle transition-transform duration-400 hover:rotate-4"
        />
        <h3 className="mb-2 text-center text-sm font-semibold uppercase tracking-[1.90px] lg:text-base">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
