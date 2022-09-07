interface IPostPreview {
  categories: string[];
  description: string;
  id: string;
  images: string[];
  location: string | null;
  price: string;
  title: string;
  user: IUser;
}
interface IUser {
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
interface IMessagePreview {
  sellerName: string;
  email: string;

  recentItem: IPostPreview[];
  image: string;
  recentMessage: string;
  recentSender: number;
  viewed: boolean;
}
