export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  bio: string | null;
  onboarded: boolean;
  following?: Array<string>;
  followers?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  url: string;
  postId: string | null;
  post: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  text: string;
  postId: string;
  post: Post;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: string;
}

export interface Post {
  id: string;
  thread: string;
  userId: string;
  user: User;
  images: Image[] | any;
  replies: Reply[] | any;
  likes: [] | any;
  createdAt: Date;
  updatedAt: Date;
}
