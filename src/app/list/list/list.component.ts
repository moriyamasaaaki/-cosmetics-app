import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  allArticles$: Observable<ArticleWithAuthor[]> = this.aritcleService.getArticles().pipe(take(1));

  constructor(
    private aritcleService: ArticleService,
  ) { }

  ngOnInit() {
  }

}
