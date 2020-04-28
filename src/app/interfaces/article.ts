import { Timestamp } from '@google-cloud/firestore';
import { User } from './user';

export interface Article {
  articleId: string;
  articleImage: string[];
  tag: string;
  content: string;
  createdAt: Timestamp;
}

export interface ArticleWithAuthor extends Article {
  author: User;
}
