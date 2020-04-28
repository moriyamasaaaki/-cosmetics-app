import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Article } from '../interfaces/article';
import { firestore } from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage/';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
  ) { }

  createArticle(userId: string, article: Article, images?: File[]) {
    const articleId = this.db.createId();
    this.db.doc(`articles/${articleId}`).set({
      userId,
      articleId,
      ...article,
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now()
    })
      .then(() => {
        if (images) {
          this.uploadImages(images, articleId);
        }
        this.snackBar.open('記事を作成しました！', null, {
          duration: 2000
        });
      })
      .catch(e => {
        console.log(e);
        this.snackBar.open('記事を作成できませんでした。', null, {
          duration: 2000
        });
      });
  }

  uploadImages(files: File[], articleId: string): Promise<void> {
    return Promise.all(
      files.map((file, index) => {
        const ref = this.storage.ref(`articles/${articleId}-${index}`);
        return ref.put(file);
      })
    ).then(async urls => {
      const articleImageUrls = [];
      for (const url of urls) {
        articleImageUrls.push(await url.ref.getDownloadURL());
      }
      return this.db.doc(`articles/${articleId}`).update({
        articleImageUrls
      });
    });
  }
}
