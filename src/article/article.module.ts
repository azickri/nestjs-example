import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
import { ArticleModel, ArticleSchema } from 'src/models/article.model';
import { ArticleController } from './article.controller';
import { ArticleDatasource } from './article.datasource';
import { ArticleService } from './article.service';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: ArticleModel.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: 'ArticleRepository',
      useClass: ArticleDatasource,
    },
  ],
  exports: [ArticleService, 'ArticleRepository'],
})
export class ArticleModule {}
