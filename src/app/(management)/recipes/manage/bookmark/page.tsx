// ** Next Imports
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipe Bookmarks",
  description: "View your bookmarked recipes",
};

// ** Components
import ManageRecipeBookmarks from "./_components/ManageRecipeBookmarks";

export default function RecipeBookmarksPage() {
  return <ManageRecipeBookmarks />;
}
