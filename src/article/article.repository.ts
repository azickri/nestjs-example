import { Types } from 'mongoose';

export type ArticleType = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type PostArticleType = {
  title: string;
  description: string;
  userId?: Types.ObjectId | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface ArticleRepository {
  getOneArticle(id: string): Promise<ArticleType>;

  getArticle(userId: string): Promise<ArticleType[]>;

  postArticle(data: PostArticleType): Promise<{ _id: Types.ObjectId }>;

  putArticle(
    id: string,
    data: PostArticleType,
  ): Promise<{ _id: Types.ObjectId }>;

  deleteArticle(id: string): Promise<void>;
}
