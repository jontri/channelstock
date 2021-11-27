import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { NewsDetails } from '@models';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailsService {

  protected url = '/services/NewsDetailsService';

  constructor(private http: HttpClient) {
  }


  getAllNewsDetailsByNewsId(newsId): Observable<NewsDetails[]> {
    return this.http.get<NewsDetails[]>(this.url + "/news/details/" + newsId).pipe(
      map((data) => {
        return data;
      })
    );
  }

  getAllNewsDetails(): Observable<NewsDetails[]> {
    return this.http.get<NewsDetails[]>(this.url).pipe(
      map((data) => {
        return data;
      })
   );
  }

  getAllNewsDetailsBySection(section, newsId): Observable<NewsDetails[]> {
    return this.http.get<NewsDetails[]>(this.url + "/" + section + "/" + newsId).pipe(
      map((data) => {
        return data;
      })
   );
  }

  saveNewsDetails(NewsDetails: NewsDetails): Observable<NewsDetails> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log(JSON.stringify({NewsDetails}));
    return this.http.post<NewsDetails>(this.url, {NewsDetails}, httpOptions);
  }
}
