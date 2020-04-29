import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormComponent } from '../form/form/form.component';

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<FormComponent> {
  canDeactivate(
    component: FormComponent,
  ): Observable<boolean> | boolean {
    if (component.form.pristine || component.form.valid) {
      return true;
    }

    const confirmation = window.confirm('作業中の内容が失われますがよろしいですか？');

    return of(confirmation);
  }
}
