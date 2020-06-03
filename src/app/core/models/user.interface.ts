export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked: boolean;
  image?: File;
}
