import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { RoadShowService, RoadShowLocationService } from '@api';
import { ConfirmationDialogService } from '@shared/services';

@Component({
  selector: 'rom-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss', '../../admin.component.scss']
})
export class LocationListComponent implements OnInit {
  locations: any = [];
  isLoading: Boolean = false;
  constructor(
    private router: Router,
    private roadShowLocationService: RoadShowLocationService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.getRoadshowLocations();
  }

  ngOnInit() {
  }

  getRoadshowLocations() {
    this.isLoading = true;
    this.roadShowLocationService.getRoadShowLocation().subscribe(
      res => {
        this.locations = res['RoadshowLocation'];
        // console.log(res);
        this.isLoading = false;
      }
    );
  }

  toAddLocation() {
    this.router.navigate(['admin/locations/add']);
  }

  toEditLocation(id: any) {
    this.router.navigate(['admin/locations/edit/'+id]);
  }

  public openConfirmationDialog(id: any, locationName: string) {
    this.confirmationDialogService.confirm('Please confirm...', 'Do you really want to delete ' + locationName + ' ? ')
    .then((confirmed) => {
      if(confirmed === true) {
        // console.log('roadshow location delete : ' + id);
        this.roadShowLocationService.deleteRoadShowLocation(id).subscribe(
          res => {
            // console.log(res);
            this.getRoadshowLocations();
          }
        );        
      } else {
        // console.log('cancel roadshow location delete : ' + id);
      }    
    })
    .catch(() => console.log('User canceled the delete.'));
  }
}
