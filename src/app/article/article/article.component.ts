import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: ArticleWithAuthor;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.getArticle();
  }

  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const articleId = this.route.snapshot.paramMap.get('articleId');
    this.articleService.getArticle(articleId)
    .pipe(
      take(2),
    )
    .subscribe(article => {
      this.article = article;
      console.log(this.article);
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

}
