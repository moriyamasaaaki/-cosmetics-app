import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleWithAuthor } from 'src/app/interfaces/article';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})
export class MypageComponent implements OnInit {
  myArticles$: Observable<ArticleWithAuthor[]> = this.aritcleService.getMyArticles(this.authService.uid).pipe(take(1));
  user$ = this.authService.afUser$;

  constructor(
    private aritcleService: ArticleService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
