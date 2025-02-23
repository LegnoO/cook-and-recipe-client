"use server";

// ** Next Imports
import { revalidatePath } from "next/cache";

// ** Services
import { toggleRecipeBookmark } from "@/services/server/recipeService";

export async function toggleRecipeBookmarkAction(
  recipeId: string,
  pathUrl: string,
) {
  try {
    await toggleRecipeBookmark(recipeId);

    revalidatePath(pathUrl);
    revalidatePath('/recipes/bookmarks');
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
