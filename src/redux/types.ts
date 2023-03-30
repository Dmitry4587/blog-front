export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  password: string;
}

export interface IAuthUser {
  user: IUser;
  token: string;
}

export interface IComment {
  _id: string;
  user: IUser;
  text: string;
}

export type TTags = string[];

export interface IPost {
  _id: string;
  title: string;
  text: string;
  img?: string;
  tags?: string[];
  comments?: IComment[];
  user: IUser;
  viewCount: number;
  commentsCount?: number;
  createdAt: Date;
}

export enum ItemStatus {
  LOADING = "loading",
  LOADED = "loaded",
  ERROR = "error",
}
