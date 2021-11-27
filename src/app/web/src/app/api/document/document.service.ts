import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private SERVICE_URL = '/services/DocumentService';

  constructor(private httpClient: HttpClient) { }

  getDocument(documentUrl: string): Observable<string> {
    //return this.httpClient.get("docs/Conditions.html",  { responseType: 'text' });
    return this.httpClient.get(this.SERVICE_URL+"/html/"+ documentUrl, { responseType: 'text' });
  }

  getDocumentFooter(): Observable<string> {
    return this.httpClient.get("docs/TermsOfUse.html",  { responseType: 'text' });
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.httpClient.get(this.SERVICE_URL+"/image/"+ imageUrl, { responseType: 'blob' });
  }
}
