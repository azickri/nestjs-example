import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostArticleDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  description: string;
}

export class ParamIdDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;
}
