type ListRecipe = {
  data: Recipe[];
  paginate: Pagination;
};

type Recipe = {
  id: string;
  name: string;
  description: string;
  timeToCook: number;
  difficulty: RecipeDifficultyEnum;
  serves: number;
  imageUrls: string[];
  status: boolean;
  verifyStatus: RecipeVerifyStatusEnum;
  createdDate: string;
};

type RecipeDifficultyEnum =
  | "Easy"
  | "Medium"
  | "Hard"
  | "Professional"
  | "Expert";

type RecipeVerifyStatusEnum = "rejected" | "unverified" | "verified";
