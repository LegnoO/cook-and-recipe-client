// ** Components
import Breadcrumb from "@/components/Breadcrumb";
import RecipeList from "./_components/RecipeList";
import QueryRecipeOwn from "../_components/QueryRecipeOwn";

export default function ManageRecipesPage() {
  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Recipes", href: "/recipes" },
    { title: "Manage" },
  ];

  return (
    <section className="flex h-full min-h-screen flex-col bg-background py-16">
      <div className="container flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbLinks} />
          </div>
          <div className="mb-8">
            <QueryRecipeOwn />
          </div>
          <RecipeList />
        </div>
      </div>
    </section>
  );
}
