import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company, Sector } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // get 50 companies at a time
  private size = 10;
  // start from beginning
  private offset = 0;
  private sortBy: string;
  private sortDirection: string;
  private numOfCompanies: number;
  public numOfPages: number;

  private currUrl: string;
  private options: any;

  private sectorFilter: string;
  private industryFilter: string;

  private companiesArr: Company[];
  private allCompaniesArr: Company[];
  private filteredCompaniesArr: Company[];
  private filterEvent: EventEmitter<Company[]>;
  private singleCompany: any;

  private SERVICE_URL = '/services/CompanyService';

  constructor(
    private httpClient: HttpClient
  ) {
    this.filterEvent = new EventEmitter<Company[]>();
    this.companiesArr = [];
    this.options = {};
    this.companiesDefault();
    this.getAllCompanies();
  }

  getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.SERVICE_URL + "/all").pipe(
      map(this.handleAllCompanies.bind(this))
    );

  }

  getCompanies(direction?: number): Observable<Company[]> {
    if (direction) {
      this.offset += this.size * direction;
    }
    this.options.params = this.options.params
      .set('offset', `${this.offset}`).set('size', `${this.size}`)
      .set('sortBy', this.sortBy).set('sortOrder', this.sortDirection);
    return this.httpClient.get<Company[]>(this.currUrl, this.options).pipe(
      map(this.handleCompanies.bind(this))
    );

  }

  getCompaniesByParticipation(participationLevel: string) {
    return this.httpClient.get<Company[]>(`${this.SERVICE_URL}/participation/${participationLevel}`).pipe(
      map(this.handleCompanies.bind(this))
    );
  }

  getCompanyById(id): Observable<Company> {
    return this.httpClient.get<Company>(this.SERVICE_URL + '/id/' + id);
  }

  getCompanyByTickerSymbol(tickerSymbol: string): Observable<Company> {
    return this.httpClient.get<Company>(this.SERVICE_URL + '/ticker/' + tickerSymbol);
  }

  companiesDefault(): void {
    this.offset = 0;
    this.options.params = new HttpParams();
    this.currUrl = this.SERVICE_URL;
  }

  companiesByExchange(exchange: string): void {
    this.offset = 0;
    this.options.params = new HttpParams();
    this.currUrl = `${this.SERVICE_URL}/exchange/${exchange}`;
  }

  companiesByMarketCap(low: number, high: number): void {
    this.offset = 0;
    this.options.params = new HttpParams().set('low', `${low}`).set('high', `${high}`);
    this.currUrl = `${this.SERVICE_URL}/marketcap`;
  }

  companiesByParticipation(participationLevel: string) {
    this.offset = 0;
    this.options.params = new HttpParams();
    this.currUrl = `${this.SERVICE_URL}/participation/${participationLevel}`;
  }

  companiesBySector(sector: string) {
    this.offset = 0;
    this.options.params = new HttpParams();
    this.currUrl = `${this.SERVICE_URL}/sector/${sector}`;
  }

  companiesByIndustry(industry: string) {
    this.offset = 0;
    this.options.params = new HttpParams();
    this.currUrl = `${this.SERVICE_URL}/industry/${industry}`;
  }

  getNumOfCompanies(): number {
    return this.numOfCompanies;
  }

  getNumOfPages(): number {
    return this.numOfPages;
  }

  getSectorsIndustries(): Observable<Sector[]> {
    return this.httpClient.get<Sector[]>(`${this.SERVICE_URL}/sectorsindustries`);
  }

  addToWatchList() {}

  getCompaniesByTickers(tickers: string): Observable<Company[]> {

    this.options.params = this.options.params.set('tickers', tickers);
    this.currUrl = this.SERVICE_URL + '/tickers';

    return this.httpClient.get<Company[]>(this.SERVICE_URL + '/tickers', this.options ).pipe(
      map(this.handleCompanies.bind(this))
    );
  }


  filterCompanies(sector: string, industry: string): void {
    let call: Observable<Company[]>;
    if (sector === 'All') {
      this.sectorFilter = this.industryFilter = null;
      call = this.getCompanies();
    } else {
      this.sectorFilter = sector;
      this.industryFilter = industry;
      call = of(this.filteredCompaniesArr =
        this.companiesArr.filter((company: Company) => company.sector === sector && (!industry || company.industry === industry)));
    }
    call.subscribe(() => this.filterEvent.emit(this.filteredCompaniesArr));
  }

  get allCompanies(): Company[] {
    return this.allCompaniesArr;
  }

  get companies(): Company[] {
    return this.filteredCompaniesArr;
  }

  get originalCompanies(): Company[] {
    return this.companiesArr;
  }

  get companiesPerPage(): number {
    return this.size;
  }

  get filterEventEmitter(): EventEmitter<Company[]> {
    return this.filterEvent;
  }

  get companyOffset(): number {
    return this.offset;
  }

  get totalCompanies(): number {
    return this.numOfCompanies;
  }

  set sortName(name: string) {
    this.sortBy = name;
  }

  set sortOrder(order: string) {
    this.sortDirection = order;
  }

  set companyOffset(val: number) {
    this.offset = val;
  }

  private handleCompanies(data): any {
    this.companiesArr = data && data['searchResult'] &&  data['searchResult']['companies']  || [];
    this.numOfCompanies = data && data['searchResult'] &&  data['searchResult']['totalCount'] || 0;
    this.numOfPages = Math.ceil(this.numOfCompanies / this.companiesPerPage);

    console.log("Total Companies:  " + this.numOfCompanies);

    if(this.companiesArr && this.companiesArr.constructor === Array) {
      this.filteredCompaniesArr = [...this.companiesArr];
    } else if(this.companiesArr) {
      this.singleCompany = this.companiesArr;
      this.filteredCompaniesArr = [];
      this.filteredCompaniesArr.push(this.singleCompany);
    }

    this.filterEvent.emit(this.filteredCompaniesArr);
    return data;
  }

  private handleAllCompanies(data): any {
    this.allCompaniesArr = data && data['company'] || [];
    return data;
  }

  updateCompany(company: Company): Observable<Company> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };

    const json = JSON.stringify({company});
    // console.log(json);
    return this.httpClient.put<Company>(this.SERVICE_URL , json, httpOptions);
  }

  setcompaniesPerPage(val: number) {
    this.size = val;
  }
}
