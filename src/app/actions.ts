"use server";

// ** Next Imports
import { revalidatePath } from "next/cache";

// ** Services
import {
  postReview,
  toggleRecipeBookmark,
} from "@/services/server/recipeService";

export async function toggleRecipeBookmarkAction(
  recipeId: string,
  pathUrl: string,
) {
  try {
    await toggleRecipeBookmark(recipeId);

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

export async function postReviewAction(
  { recipeId, message, rating }: ReviewPayload,
  pathUrl: string,
) {
  try {
    await postReview({ recipeId, message, rating });

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
