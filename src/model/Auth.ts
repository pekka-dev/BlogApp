export interface Auth {
  username: string;
  jwt: string;
  createdAt: Date;
  loggedInAt: Date;
}

export interface AuthContextValue {
  auth: Auth | null;
  signup: (user: string, pass: string) => Promise<Auth>;
  loginUser: (user: string, pass: string) => Promise<Auth>;
  logoutUser: () => void;
}

export interface User {
  username: string;
  password: string;
}
