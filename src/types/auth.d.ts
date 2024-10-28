interface IRoutePermission {
  page: string;
  actions: string[];
}
type ChefLevel = "Beginner" | "Home cook" | "Professional" | "Master chef";
type ChefStatus = "active" | "disabled" | "pending" | "rejected" | "banned";

type ChefInfo = {
  startedDate: Date;
  description: string;
  level: ChefLevel;
  status: ChefStatus;
  approvalDate: Date;
};

type Gender = "Male" | "Female" | "Other";
type User = {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: Date | null;
  avatar: string;
  permission: IRoutePermission[];
};

type UserProfile = Omit<User, "permission"> & {
  gender: Gender;
  phone: string;
  chefInfo: ChefInfo;
};

type AuthTokens = string;

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}
