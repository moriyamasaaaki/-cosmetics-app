import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { searchClient } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  resultParams = {
    hitsPerPage: '10',
    query: ''
  };
  config = {
    indexName: 'article',
    searchClient
  };

  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.resultParams.query = map.get('title');
    });
  }
  ngOnInit() {
  }

}
