"use client";

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
    <section className="flex h-full min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          <div className="mb-8">
            <Breadcrumb items={breadcrumbLinks} />
          </div>
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">
            Recipe Management
          </h1>
          <div className="mb-4">
            <QueryRecipeOwn />
          </div>
          <RecipeList />
        </div>
      </div>
    </section>
  );
}
