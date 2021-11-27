import {
  Component,
  OnInit,
  Inject,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NewsService, CompanyService } from '@api';
// import { News, Company } from '@models';
import { OrderPipe } from 'ngx-order-pipe';
// import { NewsFeatures } from '../../models/news-features';

@Component({
  selector: 'rom-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  params: string;

  // newsFeature: NewsFeatures;
  // newsFeatures: News[];
  // newsFeaturesForView: NewsFeatures[] = [];
  // relatedCompanies: Company[];
  // order = 'date';
  // reverse = false;
  // sortedCollection: any[];
  newsExpanded: any = true;

  collapseHeight: number;
  expandHeight: number;

  constructor(
    @Inject(DOCUMENT) private document: HTMLDocument,
    public newsService: NewsService,
    private companyService: CompanyService,
    private orderPipe: OrderPipe
  ) {

    this.newsService.expandListener.subscribe(
      res => {
        this.newsExpanded = res;
      }
    );
  }

  ngOnInit() {
    console.log('homepage onInit');
    //this.getNewsFeatures();
  }

  // getNewsFeatures() {
  //   console.log('getNewsFeatures...');
  //   this.newsService.getNewsFeatures().subscribe(newsFeatures => {
  //     this.newsFeatures = newsFeatures['News'];
  //     this.newsFeatures.sort((a: any, b: any) => {
  //       return b.date > a.date ? 1 : -1;
  //     });
  //
  //
  //     this.newsFeatures.forEach(element => {
  //       if (element.relatedCompanies.length > 0) {
  //         this.companyService.getCompaniesByTickers(element.relatedCompanies).subscribe(data => {
  //           const companyList = data['searchResult']['companies'];
  //
  //           if (companyList.constructor === Array) {
  //             this.relatedCompanies = companyList;
  //           } else {
  //             this.relatedCompanies = [companyList];
  //           }
  //           this.newsFeature = new NewsFeatures(element, this.relatedCompanies);
  //           this.newsFeaturesForView.push(this.newsFeature);
  //       });
  //     }
  //     });
  //
  //     this.sortedCollection = this.orderPipe.transform(
  //       this.newsFeaturesForView,
  //       'date'
  //     );
  //
  //   });
  // }
}
