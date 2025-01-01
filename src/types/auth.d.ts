interface IRoutePermission {
  page: string;
  actions: string[];
}
type ChefLevel = "Beginner" | "Home cook" | "Professional" | "Master chef";
type ChefStatus = "active" | "disabled" | "pending" | "rejected" | "banned";

type ChefListResponse = {
  data: Chef[];
  paginate: Pagination;
};

type Chef = {
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

type Gender = "Male" | "Female" | "Other";

type User = {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date | null;
  address: {
    number: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  };
  avatar: string;
  phone: string;
  status: boolean;
  chefId: string;
};

type UserProfile = Omit<User, "id"> & {
  gender: Gender;
  createdDate: string;
  chefInfo: ChefInfo;
};

type UserInfo = {
  id: string;
  avatar: string;
  fullName: string;
  email: string;
};

type AuthTokens = string;

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}
