export interface User {
  age: string | null;
  bio: string | null;
  dateOfBirth: string | null;
  email: string | null;
  id: string | null;
  image: string | null;
  name: string | null;
  username: string | null;
  followers: string[];
  following: string[];
  city: string | null;
  link: string | null;
  hashedPassword: string;
  emailVerified: string | null;
  verificationCode: string | null;
  notification: Notifications;
  openedNotifications: boolean | null;
  isVerified: boolean;
}

export interface Notifications {
  user: String;
  date: Date;
  message: String;
  User: User;
  userId: String;
}

export interface Profile {
  id: string;
  isUser: boolean;
  isVerified: boolean;
  name: string;
  image: string;
  username: string | null;
  followers: String[];
  following: String[];
  isFollowing: boolean;
  bio: string | null;
  link: string | null;
  city: string | null;
}

export interface FollowUser {
  User: {
    username: string;
    name: string;
    id: string;
    image: string;
    imageName: string;
  };
  following: {
    username: string;
    name: string;
    id: string;
    image: string;
    imageName: string;
  };
}

export interface UserProfile {
  isUser: boolean;
  followUser: boolean;

  user: {
    id: string;
    name: string;
    imageName: string;
    image: string;
    emailVerified: string;
    username: string;
    bio: string;
    link: string;
    city: string;
    following: FollowUser[];
    followedBy: FollowUser[];
  };
}
interface Following {
  username: string;
  id: string;
  name: string;
  image: string | null;
  imageName: string;
}

interface FollowedBy {
  username: string;
  id: string;
  name: string;
  image: string | null;
  imageName: string;
}

export interface Follow {
  followUser: boolean;
  following: Following[];
  followedBy: Following[];
}
