import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$ = this.authService.afUser$;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.getSetTitle();
  }

  getSetTitle() {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      )
      .subscribe(data => {
        this.titleService.setTitle(data);
        const meta = this.metaService;
        data.descrption
          ? meta.updateTag({ name: 'description', content: data.descrption })
          : meta.removeTag("name='description'");

        data.robots
          ? meta.updateTag({ name: 'robots', content: data.robots })
          : meta.updateTag({ name: 'robots', content: 'follow,index' });

        data.ogTitle
          ? meta.updateTag({ property: 'og:title', content: data.ogTitle })
          : meta.removeTag("property='og:title'");

        data.ogDescription
          ? meta.updateTag({
            property: 'og:description',
            content: data.ogDescription
          })
          : meta.removeTag("property='og:description'");

        data.ogImage
          ? meta.updateTag({ property: 'og:image', content: data.ogImage })
          : meta.removeTag("property='og:image'");

        data.ogUrl
          ? meta.updateTag({ property: 'og:url', content: data.ogUrl })
          : meta.updateTag({ property: 'og:url', content: this.router.url });
      });
  }

}

