export interface User {
  uid: string;
  name: string;
  email: string;
  emailVerified: boolean;
  isAdmin: boolean;
  photoURL?: string;
}
