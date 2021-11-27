import { News } from "@models";
import { Company } from "./company.model";


export class NewsFeatures {
  public news: News;
  public companies: Company[];

  constructor(news: News, companies: Company[]){
    this.news = news;
    this.companies = companies;
  }
}
