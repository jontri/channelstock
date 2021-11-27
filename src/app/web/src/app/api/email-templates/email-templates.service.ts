import { HttpClient, HttpHeaders} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {EmailTemplateDetails} from '@models';
// import { EmailTemplates } from './mock-email-templates';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplatesService {
    private SERVICE_URL = '/services/EmailTemplateService';
    private filterEvent: EventEmitter<EmailTemplateDetails[]>;

    constructor(
        private httpClient: HttpClient
    ) {
      this.filterEvent = new EventEmitter<EmailTemplateDetails[]>();
    }

    getAllEmailTempates() {
      return this.httpClient.get<EmailTemplateDetails[]>(this.SERVICE_URL).pipe(
        map((data) => {
          return data;
        })
      );
    }

    getEmailTemplatebyId(id) {
        // return of(EmailTemplates[0]);
        return this.httpClient.get<EmailTemplateDetails>(`${this.SERVICE_URL}/${id}`).pipe(
          map((data) => {
            return data;
          })
        );
    }

    addEmailTemplate(EmailTemplate: EmailTemplateDetails): Observable<EmailTemplateDetails> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.httpClient.post<EmailTemplateDetails>(this.SERVICE_URL, {EmailTemplate}, httpOptions);
    }

    editEmailTemplate(EmailTemplate: EmailTemplateDetails): Observable<EmailTemplateDetails> {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      const json = JSON.stringify({ EmailTemplate });
      return this.httpClient.put<EmailTemplateDetails>(this.SERVICE_URL, json, httpOptions);
    }

    deleteEmailTemplate(id) {
      return this.httpClient.delete<EmailTemplateDetails>(`${this.SERVICE_URL}/${id}`).pipe(
        map((data) => {
          return data;
        })
      );
    }
}
