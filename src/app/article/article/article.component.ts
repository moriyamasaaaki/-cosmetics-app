import { Component, OnInit, DoCheck } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { LikedService } from 'src/app/services/liked.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, DoCheck {

  article: ArticleWithAuthor;
  isLike: boolean;
  likedCount: number;
  contributor: boolean;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthService,
    private likedService: LikedService,
    private snackbar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.getArticle();
  }

  ngOnInit() {
    this.getLiked();
    this.getTitle();
  }

  ngDoCheck() {
    this.checkContributor();
  }

  getTitle() {
    this.route.paramMap.subscribe(params => {
      this.articleService.getArticle(params.get('articleId')).subscribe(data => {
        this.titleService.setTitle(`${data.title}-Men's-ClearLab`);
        const meta = this.metaService;
        data.content
          ? meta.updateTag({
            name: 'description',
            content: data.content
          })
          : meta.removeTag("name='description'");

        data.title
          ? meta.updateTag({ property: 'og:title', content: data.title })
          : meta.removeTag("property='og:title'");

        data.content
          ? meta.updateTag({
            property: 'og:description',
            content: data.content
          })
          : meta.removeTag("property='og:description'");

        data.articleImageUrls[0]
          ? meta.updateTag({
            property: 'og:image',
            content: data.articleImageUrls[0]
          })
          : meta.removeTag("property='og:image'");
      });
    });
  }




  getArticle() {
    const articleId = this.route.snapshot.paramMap.get('articleId');
    this.articleService.getArticle(articleId)
      .pipe(
        take(2),
      )
      .subscribe(article => {
        this.article = article;
      });
  }

  delte() {
    this.route.paramMap.subscribe(params => {
      const articleId = params.get('articleId');
      this.articleService.getArticle(articleId).subscribe(article => {
        this.dialog
          .open(DialogComponent, {
            data: {
              name: `${article.title}を削除しますか？？`,
              text: '削除すると復元することはできません。',
              button: '削除する'
            }
          })
          .afterClosed()
          .subscribe(status => {
            if (status) {
              this.articleService.deleteArticle(articleId);
            }
          });
      });
    });
  }

  getLiked() {
    const auth = this.authService.uid;
    this.route.paramMap.subscribe(params => {
      this.articleService.getArticle(params.get('articleId'))
      .pipe(take(1))
      .subscribe(articleData => {
        const likedId = articleData.articleId;
        this.likedCount = articleData.liked;
        if (this.authService.uid) {
          this.likedService.checkisLiked(likedId, this.authService.uid)
          .pipe(take(1))
          .subscribe(doc => {
            this.isLike = doc;
          });
        }
      });
    });
  }

  toggleLiked() {
    this.route.paramMap.subscribe(params => {
      const auth = this.authService.uid;
      const paramId = params.get('articleId');
      if (auth && !this.isLike) {
        this.isLike = true;
        this.likedCount++;
        this.likedService.likeArticle(paramId, auth);
        this.snackbar.open('お気に入りに追加しました', null, {
          duration: 2000
        });
      } else if (auth && this.isLike) {
        this.isLike = false;
        this.likedCount--;
        this.likedService.unLike(paramId, auth);
        this.snackbar.open('お気に入り削除しました。', null, {
          duration: 2000
        });
      } else if (!auth) {
        this.snackbar.open('いいねできません。ログインしてください⚠️', null, {
          duration: 2000
        });
      }
    });
  }

  checkContributor(): void {
    this.route.paramMap.subscribe(params => {
      const authId = this.authService.uid;
      const articleId = params.get('articleId');
      this.articleService.getArticle(articleId).subscribe(article => {
        const userId = article.userId;
        if (userId === authId) {
          this.contributor = true;
        } else if (userId !== authId) {
          this.contributor = false;
        }
      });
    });
  }

}

