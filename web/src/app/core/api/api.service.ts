import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient
  ) {}

  createArticle<T = any>(body: { title: string; text: string }): Observable<T> {
    return this.httpClient
      .put<T>(`${environment.backendUrl}/user/qwerty/articles/`, body)
      .pipe(map((data) => data));
  }

  updateArticle<T = any>(body: {
    article_pk: string;
    text?: string;
    tags?: string[];
    title?: string;
  }): Observable<T> {
    return this.httpClient
      .post<T>(`${environment.backendUrl}/user/qwerty/articles/`, body)
      .pipe(map((data) => data));
  }

  createTag<T = any>(name: string): Observable<T> {
    return this.httpClient
      .put<T>(`${environment.backendUrl}/tag/`, { name })
      .pipe(map((data) => data));
  }

  createComment<T = any>(
    article: string,
    body: {
      author: string;
      text: string;
    }
  ): Observable<T> {
    return this.httpClient
      .put<T>(`${environment.backendUrl}/articles/${article}/comment/`, body)
      .pipe(map((data) => data));
  }

  filterTags<T = any[]>(body: { tags: string[] }): Observable<T> {
    return this.httpClient
      .post<{ qs: T }>(`${environment.backendUrl}/articles/filter/`, body)
      .pipe(map((data) => data.qs));
  }

  filterArticlesByText<T = any>(body: {
    search_string: string;
  }): Observable<T> {
    return this.httpClient
      .post<T>(`${environment.backendUrl}/articles/filter/`, body)
      .pipe(map((data) => data));
  }

  subscribeTo<T = any>(id: string): Observable<T> {
    return this.httpClient
      .post<T>(`${environment.backendUrl}/user/${id}/subscribers/`, {
        subscriber_pk: 'qwerty',
      })
      .pipe(map((data) => data));
  }

  getUserNews<T = string>(): Observable<T> {
    return this.httpClient.get<T>(`${environment.backendUrl}`).pipe();
  }

  // checkUser<T = string>(): Observable<T> {
  //   return this.httpClient.get<T>(this.URL).pipe(map((data) => data));
  // }

  getUser<T = any>(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${environment.backendUrl}/user/${id}/`)
      .pipe(map((data) => data));
  }

  getUserSubscribers<T = any[]>(): Observable<T> {
    return this.httpClient
      .get<{ qs: T }>(
        `${environment.backendUrl}/user/qwerty/subscribers/`
      )
      .pipe(map((data) => data.qs));
  }

  getUserSubscriptions<T = any[]>(): Observable<T> {
    return this.httpClient
      .get<{ qs: T }>(
        `${environment.backendUrl}/user/qwerty/subscriptions/`
      )
      .pipe(map((data) => data.qs));
  }

  getAllTags<T = any[]>(): Observable<T> {
    return this.httpClient
      .get<{ qs: T }>(`${environment.backendUrl}/tag/`)
      .pipe(map((data) => data.qs));
  }

  getArticle<T = any>(article: string): Observable<T> {
    return this.httpClient
      .get<T>(`${environment.backendUrl}/articles/${article}/`)
      .pipe(map((data) => data));
  }

  getUserArticles<T = any[]>(): Observable<T> {
    return this.httpClient
      .get<{ qs: T }>(
        `${environment.backendUrl}/user/qwerty/articles/`
      )
      .pipe(map((data) => data.qs));
  }

  getTrendingArticles<T = any[]>(): Observable<T> {
    return this.httpClient
      .get<{ qs: T }>(`${environment.backendUrl}/articles/trending/`)
      .pipe(map((data) => data.qs));
  }
}
