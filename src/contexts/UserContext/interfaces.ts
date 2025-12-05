export interface UserContextInterface {
  authenticated: boolean;
  userInfo: LoginResponse | null;
  loginUser: (data: LoginResponse) => void;
  logoutUser: () => void;
}

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  profile: string;
  token: string;
}
