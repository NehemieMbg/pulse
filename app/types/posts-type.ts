export interface PostLink {
  itemName: string | null;
  itemLink: string | null;
}

export interface Author {
  author: {
    id: string;
    emailVerified: Date;
    name: string;
    username: string;
  };
}

export interface Comment {
  author: {
    emailVerified: Date;
    name: string;
    username: string;
    image: string;
    imageName: string;
  };
  content: string;
}
export interface Like {
  likedPost: boolean;
  likes: UserLikes[];
}

export interface UserLikes {
  author: {
    id: string;
    image: string;
    name: string;
    username: string;
    emailVerified: string;
  };
  id: string;
  postId: string;
  userId: string;
}

export interface Post {
  id: string;
  createdAt: string;
  likes: number;
  caption: string;
  imageName: string;
  imageUrl: string;
  author: {
    id: string;
    username: string;
    name: string;
    image: string;
    imageName: string;
    emailVerified: string;
  };
  items: PostLink[];
  comments: Comment[];
}
