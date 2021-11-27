import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '@models';

/* tslint:disable:max-line-length */

// const NEWS: News[] = [
//   { id: 1, title: 'Human Genome Project - 15 years later', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') },
//   { id: 2, title: 'Block Chain - Does anybody really know', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') },
//   { id: 3, title: 'Artificial Intelligence - Not so Artificial', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') },
//   { id: 4, title: 'Cannabis - Where`s to smoke ...', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') },
//   { id: 5, title: 'It\'s not easy being green - Kermit talks about living off the grid.', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') },
//   { id: 6, title: 'Waste-to-Energy - A waste of energy?', content: '', companyId: 1, category: '', categoryId: 1, date: new Date('2018-01-18T00:00:00+00:00') }
// ];

/* tslint:enable:max-line-length */

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  protected url = '/services/NewsService';
  channelFilterListener = new Subject();
  expandListener = new Subject();

  private newsHash = {};

  constructor(private http: HttpClient) {
    // NEWS.forEach(news => this.newsHash[news.id] = news);

  }
  get isAdmin(): boolean {
    return localStorage.getItem('ROLES') == 'ADMIN';
  }

  getAllNews(): Observable<News[]> {
    // return of(NEWS);
    // return this.http.get<News[]>(this.url);
    return this.http.get<News[]>(this.url).pipe(
      map((data) => {
        return data;
      })
   );
  }

  getAllNewsRelatedCompanies(relatedCompanies, newsId): Observable<News[]> {

    return this.http.get<News[]>(this.url + '/' + relatedCompanies + '/' + newsId).pipe(
      map((data) => {
        return data;
      })
   );
  }

  getNewsById(id): Observable<News> {
    console.log('getNewsById');
    if (this.isAdmin) {
    return this.http.get<News>(this.url + '/' + id).pipe(
      map((data) => {
        return data;
      })
   );
    } else {
      return this.http.get<News>(this.url + '/current/' + id).pipe(
        map((data) => {
          return data;
        })
     );
    }
  }

  // getAdminNewsById(id): Observable<News> {
  //   console.log('getAdminNewsById');
  //   return this.http.get<News>(this.url + '/' + id).pipe(
  //     map((data) => {
  //       return data;
  //     })
  //  );
  // }

  getNewsByCategoryId(categoryId): Observable<News[]> {
    // const filteredNews = [];

    // NEWS.forEach(element => {
    //   if (element.categoryId === categoryId) {
    //      filteredNews.push(element);
    //   }
    // });

    // if (categoryId === 5) {
    //   return of(NEWS);
    // }
    return of (this.newsHash[categoryId]);
    // return this.http.get<News[]>(this.url);
  }

  // getNewsByCompany(companyId): Observable<News[]> {
  //   const filteredNews = [];
  //   NEWS.forEach(element => {
  //     if (element.companyId === companyId) {
  //       filteredNews.push(element);
  //     }
  //   });
  //   return of (filteredNews);
  // }


  saveNews(News: News): Observable<News> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log(JSON.stringify({News}));
    return this.http.post<News>(this.url, {News}, httpOptions);
  }

  updateNews(News: News): Observable<News> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log(News);
    return this.http.put<News>(this.url, {News},  httpOptions);
  }

  deleteNews(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  getNewsFeatures(): Observable<News[]> {
    return this.http.get<News[]>(this.url + '/all/features').pipe(
      map((data) => {
        return data;
      })
   );
  }

  getPublishedCurrentNews(): Observable<News[]> {
    return this.http.get<News[]>(this.url + '/all/publishedcurrentnews').pipe(
      map((data) => {
        return data;
      })
    );
  }

  getPublishedNews(): Observable<News[]> {
    return this.http.get<News[]>(this.url + '/all/published').pipe(
      map((data) => {
        return data;
      })
    );
  }

  getPublishedNewsByType(type: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.url}/all/published/${type}`);
  }

  getFeaturedNews(): Observable<News> {
    return this.http.get<News>(`${this.url}/featured`);
  }
}
