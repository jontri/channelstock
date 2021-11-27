import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AggreementsService {

  protected url = '/services/UserAuditService';
  result : any;

  constructor(private http: HttpClient) { }

  roadshowAgreement(id: number) {    
    return this.http.put(this.url + '/aggreement/roadshow/user/' + id, httpOptions);
  }

  didUserAgreeToRoadshows(id:number): Observable<string> {
    return this.http.get(this.url + "/aggreement/roadshow/" + id, { responseType: 'text' }); 
  }

  channelCastsAgreement(id: number) {    
    return this.http.put(this.url + '/aggreement/channelcasts/user/' + id, httpOptions);
  }

  didUserAgreeToChannelCasts(id:number): Observable<string> {
    return this.http.get(this.url + "/aggreement/channelcasts/" + id, { responseType: 'text' }); 
  }

  corporatePresentationAggreement(presentationId:number, id:number){
    return this.http.put(this.url + '/aggreement/corporate-presentation/presentation/'+presentationId+'/user/' + id , httpOptions);  
  }

  didUserAgreeToCorporatePresentation(presentationId:number, id:number): Observable<string> {
    return this.http.get(this.url + '/aggreement/corporate-presentation/presentation/'+presentationId+'/user/' + id , { responseType: 'text' }); 
  }

  researchReportAggreement(reportId:number, id:number){
    return this.http.put(this.url + '/aggreement/research-reports/report/' + reportId +'/user/'+ id , httpOptions);     
  }

  didUserAgreeToResearchReport(reportId:number, id:number): Observable<string> {
    return this.http.get(this.url + '/aggreement/research-reports/report/' + reportId +'/user/'+ id , { responseType: 'text' }); 
  }
}
