export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  bio: string | null;
  onboarded: boolean;
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

export interface Post {
  id: string;
  thread: string;
  userId: string;
  user: User;
  images: Image[] | any;
  createdAt: Date;
  updatedAt: Date;
}
