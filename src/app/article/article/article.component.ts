import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
  ) { }

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

}
