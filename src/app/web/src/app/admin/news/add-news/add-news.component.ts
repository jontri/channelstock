import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '../../../../../node_modules/@angular/router';
import {CompanyService, NewsService} from '@api';
import { Location } from '@angular/common';


@Component({
  selector: 'rom-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  newsEntity: any;
  companies: any[];
  bannerUrl: any;
  news: any = {
    bull: [
      {
        content: ''
      }
    ],
    bear: [
      {
        content: ''
      }
    ],
    balanced: [
      {
        content: ''
      }
    ]
  };
  newsForm: FormGroup;
  showPreview: Boolean = false;
  constructor(
    private router: Router,
      private formBuilder: FormBuilder,
      private companyService: CompanyService,
      private newsService: NewsService,
      public location: Location
    ) {
    this.formInit();
    // this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      res => {
        this.companies = res['company'];
      }
    );
  }

  ngOnInit() {
  }

  formInit() {
    this.newsForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      bannerTitle: ['', Validators.compose([Validators.required])],
      headerTitle: ['', Validators.compose([Validators.required])],
      bannerUrl: ['', Validators.compose([Validators.required])],
      relatedCompanies: ['', Validators.compose([Validators.required])],
      isEquityReport: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      visible: ['', Validators.compose([Validators.required])],
      newsItemType: [this.news.newsItemType, Validators.compose([Validators.required])],
      featured: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(values: any) {

    this.newsEntity = {
      "title": values.title,
      "content": this.news.content,
      "category": values.category,
      "bannerTitle": values.bannerTitle,
      "headerTitle": values.headerTitle,
      "bannerContent": this.bannerUrl,
      "relatedCompanies": values.relatedCompanies,
      "isEquityReport": values.isEquityReport,
      "visible":values.visible,
      "newsItemType": values.newsItemType,
      "newsDetails": [],
      "featured":values.featured,
    }

    if(values.date)
      this.newsEntity.date = `${values.date.month}/${values.date.day}/${values.date.year}`;

    this.news.bull.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "bull"
      };

      if (element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    this.news.bear.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "bear"
      };
      if (element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    this.news.balanced.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "balanced"
      };

      if (element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    // console.log(this.newsEntity);

    this.newsService.saveNews(this.newsEntity).subscribe(
      res => {
        console.log(res);
      }
    );
    this.newsForm.reset();
    setTimeout(() => {
      this.back();
    }, 100);
  }

  back() {
    this.router.navigate(['admin/news/list']);
  }

  addItem(section) {
    switch (section) {
      case 'bull':
        if (this.news.bull[this.news.bull.length - 1].content === '') {
          alert('Please fill-up field before adding a new one');
        } else {
          this.news.bull.push({content: ''});
          console.log("bulls added ");
          console.log(this.news.bull);
        }
        break;

      case 'bear':
        if (this.news.bear[this.news.bear.length - 1].content === '') {
          alert('Please fill-up field before adding a new one');
        } else {
          this.news.bear.push({content: ''});
        }
        break;

      case 'balanced':
        if (this.news.balanced[this.news.balanced.length - 1].content === '') {
          alert('Please fill-up field before adding a new one');
        } else {
          this.news.balanced.push({content: ''});
        }
        break;
    }

  }

  removeItem(section, index) {
    switch (section) {
      case 'bull':
        this.news.bull.splice(index, 1);
        break;

      case 'bear':
        this.news.bear.splice(index, 1);
        break;

      case 'balanced':
        this.news.balanced.splice(index, 1);
        break;
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.bannerUrl = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  toPreview() {
    console.log(this.newsForm);
    console.log(this.news);

    this.showPreview = true;
    this.news.title = this.newsForm.controls['title'].value;
    this.news.bannerTitle = this.newsForm.controls['bannerTitle'].value;
    this.news.headerTitle = this.newsForm.controls['headerTitle'].value;
    this.news.bannerUrl = this.bannerUrl;
    this.news.date = `${this.newsForm.controls['month'].value}/${this.newsForm.controls['day'].value}/${this.newsForm.controls['year'].value}`;
  }

  backToForm() {
    this.showPreview = false
  }


}
