interface IRoutePermission {
  page: string;
  actions: string[];
}

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
