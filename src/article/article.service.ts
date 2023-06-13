import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepository, PostArticleType } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleRepository') private articleRepository: ArticleRepository,
  ) {}

  async getArticle(userId: string) {
    const docs = await this.articleRepository.getArticle(userId);
    return { docs };
  }

  async postArticle(data: PostArticleType, userId: string) {
    data.userId = userId;
    data.createdAt = new Date();
    data.updatedAt = new Date();

    const postArticle = await this.articleRepository.postArticle(data);

    return { _id: postArticle._id, ...data };
  }

  async putArticle(id: string, data: PostArticleType) {
    const article = await this.articleRepository.getOneArticle(id);
    if (!article) {
      return Promise.reject({
        statusCode: 404,
        message: 'article not found',
      });
    }

    data.userId = article.userId;
    data.createdAt = article.createdAt;
    data.updatedAt = new Date();

    const postArticle = await this.articleRepository.putArticle(id, data);

    return { _id: postArticle._id, ...data };
  }

  async deleteArticle(id: string) {
    await this.articleRepository.deleteArticle(id);
  }
}
