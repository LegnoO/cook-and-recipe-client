type ListRecipe = {
  data: Recipe[];
  paginate: Pagination;
};

type Recipe = {
  id: string;
  name: string;
  category: Category;
  timeToCook: number;
  difficulty: RecipeDifficultyEnum;
  serves: number;
  imageUrls: string[];
  createdDate: string;
  createdBy: {
    level: ChefLevel;
    startedDate: string;
    description: string;
    userInfo: UserInfo;
  };
  viewCount: number;
  feedbackCount: number;
  rating: null | number;
  description: string;
  status: boolean;
  verifyStatus: RecipeVerifyStatusEnum;
};

type Category = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
};

type RecipeDifficultyEnum =
  | "Easy"
  | "Medium"
  | "Hard"
  | "Professional"
  | "Expert";

type RecipeVerifyStatusEnum =
  | "rejected"
  | "unverified"
  | "pending"
  | "verified";
