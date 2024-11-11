interface IRoutePermission {
  page: string;
  actions: string[];
}
type ChefLevel = "Beginner" | "Home cook" | "Professional" | "Master chef";
type ChefStatus = "active" | "disabled" | "pending" | "rejected" | "banned";

type ChefInfo = {
  startedDate: string;
  description: string;
  level: ChefLevel;
  status: ChefStatus;
  approvalDate: string;
};

type Gender = "Male" | "Female" | "Other";
type User = {
  id: string;
  fullName: string;
  email: string;
  dateOfBirth: string | null;
  avatar: string;
  permission: IRoutePermission[];
};

type UserProfile = Omit<User, "permission"> & {
  gender: Gender;
  phone: string;
  chefInfo: ChefInfo;
  dateOfBirth: string | null;
  address: {
    number: string;
    street: string;
    ward: string;
    district: string;
    city: string;
  };
};

type AuthTokens = string;

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}
