import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { News } from '@models';
import { CompanyService, NewsService } from '@api';
import { Location } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'rom-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {
  loading = false;
  bannerUrl: any;
  newsEntity: any;
  companies: any[];
  news: any = {};
  newsForm: FormGroup;
  showPreview: Boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private newsService: NewsService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    this.formInit();
  }

  getNews(newsId) {
    this.loading = true;
    this.newsService.getNewsById(newsId).subscribe(
      res => {
        this.loading = false;
        this.news = res['News'];
        this.news.bull = [];
        this.news.bear = [];
        this.news.balanced = [];

        this.formInit();
        this.newsForm.get('date').setValue({
          year: parseInt(moment(this.news.date).format('YYYY'), 10),
          month: parseInt(moment(this.news.date).format('M'), 10),
          day: parseInt(moment(this.news.date).format('D'), 10)
        });

        if(this.news.newsDetails){

          if(Array.isArray(this.news.newsDetails)){
            this.news.newsDetails.forEach(element => {

              if(element.content) {
                if (element.section == "bull") {
                  this.news.bull.push(element);
                } else if (element.section == "bear") {
                  this.news.bear.push(element);
                } else if (element.section == "balanced") {
                  this.news.balanced.push(element);
                }
              }

            });
          } else {

            if(this.news.newsDetails.content) {
              if (this.news.newsDetails.section == "bull") {
                this.news.bull.push(this.news.newsDetails);
              } else if (this.news.newsDetails.section == "bear") {
                this.news.bear.push(this.news.newsDetails);
              } else if (this.news.newsDetails.section == "balanced") {
                this.news.balanced.push(this.news.newsDetails);
              }
            }
          }


        }

        if(this.news.bull.length == 0){
          this.news.bull.push({ content: '', section: 'bull' });
        }

        if(this.news.bear.length == 0){
          this.news.bear.push({ content: '', section: 'bear' });
        }

        if(this.news.balanced.length == 0){
          this.news.balanced.push({ content: '', section: 'balanced' });
        }

      }
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      res => {
        this.companies = res['company'];
      }
    );
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => {
        this.getNews(params.id);
      }
    );
  }

  formInit() {
    this.newsForm = this.formBuilder.group({
      id: this.news.id,
      title: [this.news.title, Validators.compose([Validators.required])],
      content: [this.news.content, Validators.compose([Validators.required])],
      category: [this.news.category, Validators.compose([Validators.required])],
      bannerTitle: [this.news.bannerTitle, Validators.compose([Validators.required])],
      headerTitle: [this.news.headerTitle, Validators.compose([Validators.required])],
      bannerUrl: [this.news.bannerUrl, Validators.compose([Validators.required])],
      relatedCompanies: [this.news.relatedCompanies, Validators.compose([Validators.required])],
      date: [this.news.date, Validators.compose([Validators.required])],
      isEquityReport: this.news.isEquityReport,
      visible: this.news.visible,
      newsItemType: [this.news.newsItemType, Validators.compose([Validators.required])],
      featured: this.news.featured
    });
  }

  onSubmit(values: any) {

    this.newsEntity  = {
      "id": values.id,
      "title": values.title,
      "content": this.news.content,
      "category": values.category,
      "bannerTitle": values.bannerTitle,
      "headerTitle": values.headerTitle,
      "bannerContent": this.bannerUrl,
      "relatedCompanies": values.relatedCompanies,
      "isEquityReport": values.isEquityReport,
      "visible": values.visible,
      "newsItemType": values.newsItemType,
      "newsDetails": [],
      "featured": values.featured
    }

    console.log("Visible: " + values.visible);

    this.newsEntity.date = `${values.date.month}/${values.date.day}/${values.date.year}`;

    this.news.bull.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "bull"
      };

      if(element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    this.news.bear.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "bear"
      };
      if(element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    this.news.balanced.forEach(element => {
      const detail: any = {
        content: element.content,
        section: "balanced"
      };

      if(element.content)
        this.newsEntity.newsDetails.push(detail);
    });

    this.newsService.updateNews(this.newsEntity).subscribe(
      res => {
        console.log(res);
      }
    );
    this.newsForm.reset();
    setTimeout(() => { this.back(); }, 100);

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
          this.news.bull.push({ content: '' });
        }
        break;

      case 'bear':
        if (this.news.bear[this.news.bear.length - 1].content === '') {
          alert('Please fill-up field before adding a new one');
        } else {
          this.news.bear.push({ content: '' });
        }
        break;

      case 'balanced':
        if (this.news.balanced[this.news.balanced.length - 1].content === '') {
          alert('Please fill-up field before adding a new one');
        } else {
          this.news.balanced.push({ content: '' });
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

