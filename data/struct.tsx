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

export interface ChatPreview {
  sellerName: string;
  email: string;
  recentItem: IPostPreview;
  image: string;
  recentMessage: string;
  recentMessageTime: string;
  recentSender: number;
  viewed: boolean;
  proposedTime?: string;
  proposedViewed?: boolean;
  proposer?: string;
  confirmedTime?: string;
  confirmedViewed?: boolean;
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

export interface MeetingInfo {
  /**
   * The start time that the meeting was proposed for (all meetings are 30 minutes)
   */
  proposeTime: string;
  /**
   * Whether the meeting was canceled by either party
   */
  isCanceled: boolean;
  /**
   * Whether the meeting is confirmed by both parties
   */
  isConfirmed: boolean;
  /**
   * The email address of the proposer
   */
  proposer: string;
}
