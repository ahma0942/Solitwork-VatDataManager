import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  onchange: BehaviorSubject<null> = new BehaviorSubject(null);
  langs = ['en', 'da'];
  lang = 'en';
  data = {};

  constructor(private http: HttpClient) { }

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/i18n/${lang || 'en'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.lang = lang;
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
          this.onchange.next(null);
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }

  selectBrowserLang() {
    const l = navigator.language.includes('-') ? navigator.language.split('-')[0] : navigator.language;
    if (this.langs.includes(l)) return this.use(l);
    return this.use(this.lang);
  }

  get(key) {
    return this.data[key];
  }
}
