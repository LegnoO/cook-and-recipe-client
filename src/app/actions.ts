"use server";

// ** Next Imports
import { revalidatePath } from "next/cache";

// ** Services
import { toggleRecipeBookmark } from "@/services/server/recipeService";
import { postReview } from "@/services/client/recipeService";

export async function toggleRecipeBookmarkAction(
  recipeId: string,
  pathUrl: string,
) {
  try {
    await toggleRecipeBookmark(recipeId);

    revalidatePath(pathUrl);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function postReviewAction(
  { recipeId, content, rating }: ReviewPayload,
  pathUrl: string,
) {
  try {
    await postReview({ recipeId, content, rating });

    revalidatePath(pathUrl);

    return { success: true };
  } catch (error) {
    console.error("🚀 ~ toggleRecipeBookmarkAction ~ error:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
