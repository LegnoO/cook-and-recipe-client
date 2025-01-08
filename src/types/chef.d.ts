type ChefLevel = "Beginner" | "Home cook" | "Professional" | "Master chef";
type ChefStatus = "active" | "disabled" | "pending" | "rejected" | "banned";

type ChefListResponse = {
  data: Chef[];
  paginate: Pagination;
};

type Chef = {
  id: string;
  level: ChefLevel;
  startedDate: string;
  description: string;
  userInfo: UserInfo;
};

type ChefInfo = {
  level: ChefLevel;
  startedDate: string;
  description: string;
  status: ChefStatus;
  approvalDate: string;
};
