// ** Next Imports

// ** Components
import QueryRecipe from "../QueryRecipe";
import Breadcrumb from "@/components/Breadcrumb";

// ** Type
type Props = {};

export default async function ManageRecipesPage({}: Props) {
  const breadcrumbItems: {
    title: string;
    href?: string;
  }[] = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
    { title: "Manage" },
  ];

  return (
    <section className="bg-background py-12">
      <div className="container">
        <div className="mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="mb-6 py-4 pt-3">
          <QueryRecipe />
        </div>
      </div>
    </section>
  );
}
