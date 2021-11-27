import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { ChannelCasts } from '@models';

/* tslint:disable:max-line-length */
const CHANNEL_CASTS: ChannelCasts[] = [
  { id: 1, subject: 'Anex', companyName: 'Anavex Life Sciences Corp.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/366e7dc8d8e24def8c934a70251ccb001d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-01-18T00:00:00+00:00') },
  { id: 2, subject: 'Avino', companyName: 'Avino Silver & Gold Mines Ltd. (Canada)', videoUrl: 'http://noble.mediasite.com/mediasite/Play/eaf527a1e10c422d82cc8329394eb21e1d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-05-11T00:00:00+00:00') },
  { id: 3, subject: 'CPI', companyName: 'CPI Aerostructures Inc.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/e6993bfa1b274464adc030aab06336231d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-02-12T00:00:00+00:00') },
  { id: 4, subject: 'DLH', companyName: 'DLH Holdings Corp.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/70a5604092f340d2be389389c57a27031d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-03-17T00:00:00+00:00') },
  { id: 5, subject: 'Energy Fuels', companyName: 'Energy Fuels Inc (Canada)', videoUrl: 'http://noble.mediasite.com/mediasite/Play/b50773278de54313bf57df435ba81a881d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-06-21T00:00:00+00:00') },
  { id: 6, subject: 'ESSA Pharma', companyName: 'ESSA Pharma Inc.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/771606a950c14c9da74e5bf0bb3a06271d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-05-22T00:00:00+00:00') },
  { id: 7, subject: 'IEC Electronics', companyName: 'IEC Electronics Corp.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/298093264b6547fc90939e30ced1541b1d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-07-01T00:00:00+00:00') },
  { id: 8, subject: 'Information Services', companyName: 'Information Services Group Inc.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/706c7d6363004bb78cdf22dd9b8020781d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-02-02T00:00:00+00:00') },
  { id: 9, subject: 'Orion Group Holdings', companyName: 'Orion Group Holdings Inc. Common', videoUrl: 'http://noble.mediasite.com/mediasite/Play/87c442ea63044a37822924fb50a917471d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-03-28T00:00:00+00:00') },
  { id: 10, subject: 'Pyxis Tankers', companyName: 'Pyxis Tankers Inc.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/c2ecebacb7d04e83a5bb8d5d2f8afdaf1d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-04-20T00:00:00+00:00') },
  { id: 11, subject: 'S&W Seed Company', companyName: 'S&W Seed Company', videoUrl: 'http://noble.mediasite.com/mediasite/Play/2d22afcf6d09472db4cf192c11c067721d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-02-01T00:00:00+00:00') },
  { id: 12, subject: 'Salem Media Group', companyName: 'Salem Media Group Inc.', videoUrl: 'http://noble.mediasite.com/mediasite/Play/ca8ba31b03ad41f290468da260e602e51d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-01-10T00:00:00+00:00') },
  { id: 13, subject: 'VBI Vaccines', companyName: 'VBI Vaccines Inc.',videoUrl: 'http://noble.mediasite.com/mediasite/Play/712f97d2d5bd447a99f986a88ac489351d?catalog=6f8e7abd96e3462f8035f48126f8084621', companyId: 1, category: 'Technology', categoryId: 12, date: new Date('2018-06-18T00:00:00+00:00') }
];
/* tslint:enable:max-line-length */

@Injectable({
  providedIn: 'root'
})
export class ChannelCastsService {

  channelFilterListener = new Subject();
  expandListener = new Subject();
  private newsHash = {};
  protected url = '/services/ChannelCastService';

  constructor(private http: HttpClient) {
    CHANNEL_CASTS.forEach(news => this.newsHash[news.id] = news);
  }
    
  getAllChannelCasts(): Observable<ChannelCasts[]> {
     return this.http.get<ChannelCasts[]>(this.url);
  }

  getChannelCastById(categoryId): Observable<ChannelCasts> {

    return this.http.get<ChannelCasts>(this.url + "/" + categoryId);

  }

  getChannelCastById2(companyInfoId): Observable<ChannelCasts[]> {
    return this.http.get<ChannelCasts[]>(this.url + "/channelCastById/" + companyInfoId);
  }

  getChannelCastByCompany(companyInfoId): Observable<ChannelCasts[]> {
    return this.http.get<ChannelCasts[]>(this.url + "/company/" + companyInfoId);
  }

  saveChannelCast(ChannelCast: ChannelCasts): Observable<ChannelCasts> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const jsonObj = JSON.stringify({ChannelCast});
    // console.log({ChannelCast});
    return this.http.post<ChannelCasts>(this.url, {ChannelCast}, httpOptions);
  }z

  updateChannelCast(ChannelCast: ChannelCasts): Observable<ChannelCasts> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    // console.log('Updating channel cast');
    const jsonObj = JSON.stringify({ChannelCast});
    // console.log({ChannelCast});
    return this.http.put<ChannelCasts>(this.url, {ChannelCast}, httpOptions);
  }

  deleteChannelCast(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
