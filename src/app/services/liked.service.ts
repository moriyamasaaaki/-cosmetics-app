import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, combineLatest, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Article, ArticleWithAuthor } from '../interfaces/article';
import { Favorite } from '../interfaces/article';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LikedService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
  ) { }


  likeArticle(itemId: string, userId: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`items/${itemId}/likedUserIds/${userId}`).set({ userId }),
      this.db.doc(`likedusers/${userId}/likeItems/${itemId}`).set({ itemId })
    ]);
  }

  unLike(itemId: string, userId: string): Promise<void[]> {
    return Promise.all([
      this.db.doc(`items/${itemId}/likedUserIds/${userId}`).delete(),
      this.db.doc(`likedUsers/${userId}/likeItems/${itemId}`).delete()
    ]);
  }

  // 記事にいいねしているかチェックする //
  checkisLiked(itemId: string, userId: string): Observable<boolean> {
    return this.db.doc(`items/${itemId}/likedUserIds/${userId}`).valueChanges().pipe(
      map(doc => !!doc)
    );
  }

  // 自分がいいねしている記事を一覧で取得する
  getLikedList(userId: string) {
    return this.db.collection<Favorite>(`likedUserIds/${userId}/likeItems`).valueChanges().pipe(
      switchMap(likeArticles => {
        return combineLatest(
          likeArticles.map(likeArticle => this.db.doc<Article>(`articles/${likeArticle.articleId}`).valueChanges())
        );
      })
    );
  }

}
