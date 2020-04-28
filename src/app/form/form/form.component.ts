import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  images: File[];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private articleService: ArticleService,
  ) { }

  form = this.fb.group({
    title: ['', [Validators.required]],
    tag: ['', []],
    article: ['', [Validators.required, Validators.maxLength(500)]],
  });

  ngOnInit() {
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get tagControl() {
    return this.form.get('tag') as FormControl;
  }

  get articleControl() {
    return this.form.get('article') as FormControl;
  }

  setImage(event) {
    if (event.target.files.length) {
      this.images = Object.values(event.target.files);
    }
  }

  submit() {
    this.articleService.createArticle(
      this.authService.uid,
      {
        ...this.form.value,
        liked: 0,
      },
      this.images
    );
  }
}
