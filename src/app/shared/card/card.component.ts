import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LikedService } from 'src/app/services/liked.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  likedCount: number;
  isLike: boolean;
  articleId: string;
  articles$: Observable<ArticleWithAuthor[]> = this.aritcleService.getArticles().pipe(take(1));
  // article: ArticleWithAuthor;
  @Input() article: ArticleWithAuthor;

  constructor(
    private aritcleService: ArticleService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private likedService: LikedService,
    private snackbar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    // this.getLiked();
  }

  // getLiked() {
  //   this.articles$.subscribe(articles => {
  //     articles.map(article => {
  //       this.articleId = article.articleId;
  //       this.likedCount = article.liked;
  //       if (this.authService.uid) {
  //         this.likedService.checkisLiked(this.articleId, this.authService.uid)
  //           .pipe(take(1))
  //           .subscribe(like => {
  //             this.isLike = like;
  //             // this.likedCount = article.liked;
  //           });
  //       }
  //     });
  //   });
  // }

  // toggleLiked(articleId: string) {
  //     this.articleId = articleId;
  //     console.log(this.articleId);
  //     const auth = this.authService.uid;
  //     if (auth && !this.isLike) {
  //       this.isLike = true;
  //       this.likedCount++;
  //       this.likedService.likeArticle(this.articleId, auth);
  //       this.snackbar.open('お気に入りに追加しました', null, {
  //         duration: 2000
  //       });
  //     } else if (auth && this.isLike) {
  //       this.isLike = false;
  //       this.likedCount--;
  //       this.likedService.unLike(this.articleId, auth);
  //       this.snackbar.open('お気に入り削除しました。', null, {
  //         duration: 2000
  //       });
  //     } else if (!auth) {
  //       this.snackbar.open('いいねできません。ログインしてください⚠️', null, {
  //         duration: 2000
  //       });
  //     }
  // }


}
