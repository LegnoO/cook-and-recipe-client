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

type RecipeDetails = {
  id: string;
  name: string;
  timeToCook: number;
  difficulty: string;
  serves: number;
  imageUrls: string[];
  createdDate: string;
  description: string;
  ingredients: ingredients[];
  instructionSections: Instruction[];
  createdBy: {
    level: ChefLevel;
    startedDate: string;
    description: string;
    userInfo: UserInfo;
  };
  category: Category;
  feedbacks: string[];
  rating: null | number;
  viewCount: number;
};

type Ingredients = {
  name: string;
  quantity: number;
  measurement: string;
};

type Instruction = {
  title: string;
  instructions: {
    step: number;
    description: string;
  }[];
};

type RecipeStatus = "public" | "private";

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
