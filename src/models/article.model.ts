import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ArticleDocument = ArticleModel & Document;

@Schema({ collection: 'articles' })
export class ArticleModel {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleModel);

ArticleSchema.index({ userId: 1 });
