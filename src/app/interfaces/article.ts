import { User } from './user';
import { firestore } from 'firebase';

export interface Article {
  articleId: string;
  articleImageUrls: string[];
  title: string;
  tag: string;
  content: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
  liked: number;
  userId: string;
}

export interface ArticleWithAuthor extends Article {
  author: User;
}

export interface Favorite {
  userId: string;
  articleId: string;
  liked: number;
}

