export interface IUser {
  userId: number;
  userFirstName: string;
  userLastName: string;
  email: string;
  hash:string;
  userAddress: string;
  userCity: string;
  userPostalCode: number;
  userPhone:string;
  isAdmin: boolean;
}