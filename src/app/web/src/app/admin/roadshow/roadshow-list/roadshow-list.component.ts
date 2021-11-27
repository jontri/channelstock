import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { RoadShowService } from '@api';
import { RoadShow } from '@models';
import { ConfirmationDialogService } from '@shared/services';

@Component({
  selector: 'rom-roadshow-list',
  templateUrl: './roadshow-list.component.html',
  styleUrls: ['./roadshow-list.component.scss', '../../admin.component.scss']
})
export class RoadshowListComponent implements OnInit {
  roadShows: RoadShow[] = [];
  isLoading: Boolean = false;
  constructor(
    private router: Router,
    private roadshowService: RoadShowService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit() {
    this.getRoadshows();
  }

  getRoadshows() {
    this.isLoading = true;
    this.roadshowService.getRoadShows().subscribe(
      res => {
        // console.log(res);
        this.roadShows = res['Roadshow'];
        this.isLoading = false;
      }
    );
  }

  toAddRoadshow() {
    this.router.navigate(['admin/roadshows/add']);
  }

  toEditRoadshow(id: any) {
    this.router.navigate(['admin/roadshows/edit/'+id]);
  }

  onRoadshowDelete(id: any) {

  }

  public openConfirmationDialog(id: any, companyName: string) {
    this.confirmationDialogService.confirm('Please confirm...', 'Do you really want to delete RoadShow for ' + companyName + ' ? ')
    .then((confirmed) => {
      if(confirmed === true) {
        // console.log('roadshow delete : ' + id);
        this.roadshowService.deleteRoadshow(id).subscribe(
          res => {
            // console.log(res);
            this.getRoadshows();
          }
        );
      } else {
        // console.log('cancel roadshow delete : ' + id);
      }
    })
    .catch(() => console.log('User canceled the delete.'));
  }
}
