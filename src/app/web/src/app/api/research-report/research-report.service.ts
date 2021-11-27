import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { ResearchReport } from '@models';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResearchReportService {

  private RESEARCH_REPORT_SERVICE_URL = '/services/ResearchReportService';

  constructor(private httpClient: HttpClient) { }

  // get(): Observable<ResearchReport> {
  //  return of(researchReport);
  // }

  getResearchReportById(reportId: number): Observable<ResearchReport> {
    return this.httpClient.get<ResearchReport>(this.RESEARCH_REPORT_SERVICE_URL + '/' + reportId);
  }

  getLatestReportForCompanyId(companyId: number): Observable<ResearchReport> {
    return this.httpClient.get<ResearchReport>(this.RESEARCH_REPORT_SERVICE_URL + '/latestReport/' + companyId);
  }

  getAllReportsForCompanyId(companyId: number): Observable<ResearchReport[]> {
    return this.httpClient.get<ResearchReport[]>(this.RESEARCH_REPORT_SERVICE_URL + '/allReports/' + companyId);
  }

  getAllReports(): Observable<ResearchReport[]> {
    return this.httpClient.get<ResearchReport[]>(this.RESEARCH_REPORT_SERVICE_URL + '/allReports/' );
  }

  addResearchReport(report: ResearchReport): Observable<ResearchReport> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const jsonObj = JSON.stringify({report});
    // console.log(jsonObj);
    return this.httpClient.post<ResearchReport>(this.RESEARCH_REPORT_SERVICE_URL, jsonObj, httpOptions);
  }
  /*
  saveResearchReportStep(step, data) {
    const reportData: any = researchReport;
    reportData[step] = data;

    return of(reportData);
  }
  */

  deleteReport(id: string) {
    return this.httpClient.delete(this.RESEARCH_REPORT_SERVICE_URL + '/' + id);
  }
}
