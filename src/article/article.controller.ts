import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserType } from 'src/types/user.type';
import { ParamIdDto, PostArticleDto } from './article.dto';
import { ArticleService } from './article.service';

@ApiTags('Article Controller')
@Controller('user/article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getArticle(@Req() { user }: { user: UserType }) {
    return this.articleService.getArticle(user._id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  postArticle(
    @Body() { title, description }: PostArticleDto,
    @Req() { user }: { user: UserType },
  ) {
    return this.articleService.postArticle({ title, description }, user._id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  putArticle(
    @Param() { id }: ParamIdDto,
    @Body() { title, description }: PostArticleDto,
  ) {
    return this.articleService.putArticle(id, { title, description });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  deleteArticle(@Param() { id }: ParamIdDto) {
    return this.articleService.deleteArticle(id);
  }
}
