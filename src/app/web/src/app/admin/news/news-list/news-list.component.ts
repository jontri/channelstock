import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import {News } from '@models';
import { NewsService } from '@api';
import { ConfirmationDialogService } from '@shared/services';

@Component({
  selector: 'rom-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss', '../../admin.component.scss']
})
export class NewsListComponent implements OnInit {

    public news: News[];
    isLoading: Boolean = false;
    constructor(
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    public newsService: NewsService
    
  ) {
    this.getAllNews();
  }

  ngOnInit() {
    console.log('News List Component');
  }

  getAllNews() {
    this.newsService.getAllNews()
    .subscribe(
      news => {
        console.log(news);
        this.news = news['News'];
      });
  }
  
  
  toAddNews() {
    this.router.navigate(['admin/news/add']);
  }

  toEditNews(id: any) {
    this.router.navigate(['admin/news/edit/'+id]);
  }

  toDeleteNews(id: any) {
    this.router.navigate(['admin/news/edit/'+id]);
  }

  public openConfirmationDialog(id: any, title: string) {
    this.confirmationDialogService.confirm('Please confirm...', 'Do you really want to delete ' + title + ' ? ')
    .then((confirmed) => {
      if(confirmed === true) {
        console.log('news delete : ' + id);
        this.newsService.deleteNews(id).subscribe(
          res => {
            console.log(res);
            this.getAllNews();
            
          }
        );        
      } else {
        console.log('cancel news delete : ' + id);
      }    
    })
    .catch(() => console.log('User canceled the delete.'));
  }
}
