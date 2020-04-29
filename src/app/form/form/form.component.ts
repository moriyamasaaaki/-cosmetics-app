import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  images: File[];
  articleId: string;
  edit: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  form = this.fb.group({
    title: ['', [Validators.required]],
    tag: ['', []],
    content: ['', [Validators.required, Validators.maxLength(500)]],
  });

  ngOnInit() {
    this.editForm();
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get tagControl() {
    return this.form.get('tag') as FormControl;
  }

  get contentControl() {
    return this.form.get('content') as FormControl;
  }

  setImage(event) {
    if (event.target.files.length) {
      this.images = Object.values(event.target.files);
    }
  }

  createForm() {
    this.articleService.createArticle(
      this.authService.uid,
      {
        ...this.form.value,
        liked: 0,
      },
      this.images
    );
  }

  updateForm() {
    this.articleService.updateArticle(
      this.authService.uid,
      {
        ...this.form.value
    },
    this.articleId,
    this.images
    );
  }

  submit() {
    if (this.edit) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  editForm() {
    this.route.queryParamMap.subscribe(article => {
      this.articleId = article.get('articleId');
      this.articleService.getForm(this.articleId)
      .subscribe(data => {
        if (data) {
          this.edit = true;
          this.form.patchValue(data);
        }
      });
    });
  }
}
