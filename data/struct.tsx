export interface IPostPreview {
  categories: string[];
  description: string;
  id: string;
  images: string[];
  location: string | null;
  price: string;
  title: string;
  user: IUser;
}
export interface IUser {
  bio: string;
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  id: string;
  netid: string;
  photoUrl: string;
  username: string;
  venmoHandle: string;
}

export interface IBuyerPreview {
  sellerName: string;
  email: string;
  recentItem: IPostPreview;
  image: string;
  recentMessage: string;
  recentSender: number;
  viewed: boolean;
  confirmedTime: string;
  confirmedViewed: boolean;
}

export interface ISellerPreview {
  sellerName: string;
  email: string;
  recentItem: IPostPreview;
  image: string;
  recentMessage: string;
  recentSender: number;
  viewed: boolean;
  proposedTime: string;
  proposedViewed: boolean;
}
export interface SUser {
  // shorter version of user interface
  username: string;
  realname: string;
  bio: string;
  photoUrl: string;
}
export interface signInfo {
  signedIn: boolean;
  accessToken: string;
  userId: string;
  email: string;
}
