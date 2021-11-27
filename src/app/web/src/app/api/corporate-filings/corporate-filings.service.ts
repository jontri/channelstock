import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorporateFilingsService {

  private CORP_FILINGS_SERVICE_URL = '/services/CompanyService/filings';
  private PRESS_RELEASE_SERVICE_URL = "/services/CompanyService/pressrelease";
  private NEWS_STORY_SERVICE_URL = "/services/CompanyService/newsstory";

  constructor(private httpClient: HttpClient) {}

  getCorporateFilings(symbol: string){
    return this.httpClient.get(this.CORP_FILINGS_SERVICE_URL + '/' + symbol);
  }

  getPressReleases(symbol: string){
    return this.httpClient.get(this.PRESS_RELEASE_SERVICE_URL + '/' + symbol);
  }

  getMostRecentPressRelease(symbol: string){
    return this.httpClient.get(this.PRESS_RELEASE_SERVICE_URL + '/' + symbol + "&limit=1");
  }  

  getNewsStory(newsId: string){
    return this.httpClient.get(this.NEWS_STORY_SERVICE_URL + '/' + newsId, {responseType: 'text'});
  }
}
