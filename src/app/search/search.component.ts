import { Component, OnInit } from '@angular/core';
import { searchClient } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  inputParams = {
    hitsPerPage: 10,
    query: ''
  };
  config = {
    indexName: 'article',
    searchClient
  };

  search(title: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        title
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe(map => {
      this.inputParams.query = map.get('q');
    });
  }

  ngOnInit() {
  }

}
