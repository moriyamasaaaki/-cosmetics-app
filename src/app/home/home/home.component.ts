import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles$: Observable<ArticleWithAuthor[]> = this.aritcleService.getArticles().pipe(take(1));

  constructor(
    private aritcleService: ArticleService,
  ) { }

  ngOnInit() {
  }

}
