import { User } from './user';
import { firestore } from 'firebase';

export interface Article {
  articleId: string;
  articleImage: string[];
  tag: string;
  content: string;
  createdAt: firestore.Timestamp;
  liked: number;
}

export interface ArticleWithAuthor extends Article {
  author: User;
}
