import { Injectable } from '@angular/core';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Channel, Sector, Industry } from '@models';

@Injectable({
  providedIn: 'root'
})
export class CheckChannelsService {
  private channelsArr: Sector[];
  private filteredSectorName: string;
  private filteredIndustryName: string;
  private filteredCategoryName: string;
  private filteredSubCategoryName: string;

  protected url = '/services/CompanyService';

  constructor(private http: HttpClient) {
    this.channelsArr = [
      {sector: 'All', industries: []}
    ];
    this.filteredSectorName = 'All';
  }

  addSectorsIndustries(sectors: Sector[]): void {
    this.channelsArr = [
      {sector: 'All', industries: []}
    ];
    // Convert objects to array.
    sectors.forEach((sector: Sector) => {
      if (!(sector.industries instanceof Array)) {
        sector.industries = [sector.industries];
      }
    });
    this.channelsArr.push(...sectors);
    this.sortChannels();
  }

  private sortChannels(): void {
    this.channelsArr.sort(this.buildSorter('sector').bind(this));
    this.channelsArr.forEach((channel: Sector) => {
      channel.industries.sort(this.buildSorter('industry').bind(this));
    });
  }

  private buildSorter(sortBy: string): Function {
    return (a: Sector|Industry, b: Sector|Industry): number => {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }
      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
      return 0;
    };
  }

  get channels(): Sector[] {
    return this.channelsArr;
  }

  get filteredSector(): string {
    return this.filteredSectorName;
  }

  set filteredSector(sector: string) {
    this.filteredSectorName = sector;
  }

  get filteredIndustry(): string {
    return this.filteredIndustryName;
  }

  set filteredIndustry(industry: string) {
    this.filteredIndustryName = industry;
  }

  get filteredCategory(): string {
    return this.filteredCategoryName;
  }

  set filteredCategory(category: string) {
    this.filteredCategoryName = category;
  }

  get filteredSubCategory(): string {
    return this.filteredSubCategoryName;
  }

  set filteredSubCategory(subCategory: string) {
    this.filteredSubCategoryName = subCategory;
  }
}

