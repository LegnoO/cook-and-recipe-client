// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Types
type Props = { category: Category };

export default function RecipeCategories({ category }: Props) {
  return (
    <Link href={`/recipes/category?=${category.id}`}>
      <div className="group flex flex-col items-center gap-4">
        <div className="aspect-square">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={176}
            height={176}
            className="h-full w-full rounded-full object-cover shadow-light-circle transition-transform duration-400 hover:rotate-4"
          />
        </div>
        <h3 className="mb-2 text-center text-sm font-semibold uppercase tracking-[1.90px] transition-colors group-hover:text-primary lg:text-base">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
