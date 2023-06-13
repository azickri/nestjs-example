import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ArticleDocument, ArticleModel } from 'src/models/article.model';
import {
  ArticleRepository,
  ArticleType,
  PostArticleType,
} from './article.repository';

@Injectable()
export class ArticleDatasource implements ArticleRepository {
  constructor(
    @InjectModel(ArticleModel.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  async getOneArticle(id: string): Promise<ArticleType> {
    return await this.articleModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async getArticle(userId: string): Promise<ArticleType[]> {
    return await this.articleModel.find({ userId: new Types.ObjectId(userId) });
  }

  async postArticle(data: PostArticleType): Promise<{ _id: Types.ObjectId }> {
    data.userId = new Types.ObjectId(data.userId);
    return await this.articleModel.create(data);
  }

  async putArticle(
    id: string,
    data: PostArticleType,
  ): Promise<{ _id: Types.ObjectId }> {
    await this.articleModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: data },
    );

    return { _id: new Types.ObjectId(id) };
  }

  async deleteArticle(id: string): Promise<void> {
    await this.articleModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
