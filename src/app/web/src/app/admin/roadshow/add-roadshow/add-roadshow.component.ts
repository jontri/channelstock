import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable, forkJoin } from 'rxjs';

import { CompanyService } from '../../../api/company/company.service';
import { RoadShowService } from '../../../api/road-shows/road-shows.service';
import { RoadShowLocationService } from '../../../api/road-show-location/road-show-location.service';
import { RoadShow } from '@models';
import { Router } from '../../../../../node_modules/@angular/router';


@Component({
  selector: 'rom-add-roadshow',
  templateUrl: './add-roadshow.component.html',
  styleUrls: ['./add-roadshow.component.scss']
})
export class AddRoadshowComponent implements OnInit {
  companies: any[];
  roadShows: any[];
  roadShowLocations: any[];
  roadShow: RoadShow;

  date      = new FormControl('', [ Validators.compose([Validators.required])]);
  time      = new FormControl('', [ Validators.compose([Validators.required])]);
  company   = new FormControl('', [ Validators.compose([Validators.required])]);
  location = new FormControl('', [ Validators.compose([Validators.required])]);
  seats     = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  overview = new FormControl('', [ Validators.compose([Validators.required])]);

  presenterBio = new FormControl();
  presenterName = new FormControl();
  presenterMugshotURL = new FormControl();

  imgContent = new FormControl();
  menuContent: any = new FormControl();

  locations: string[] = [];
  roadShowForm: FormGroup;
  speaker_photo: any;
  isNewlyUploaded: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private roadshowService: RoadShowService,
    private roadShowLocationService: RoadShowLocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formInit();

    forkJoin(
      //this.companyService.getCompanies(),
      this.companyService.getCompaniesByParticipation('Discover'),
      this.roadshowService.getRoadShows(),
      this.roadShowLocationService.getRoadShowLocation()
    ).subscribe(data => {
      const [ companies, roadShows, roadShowLocations ] = data;

      this.companies = companies['company'];
      this.roadShows = roadShows;
      this.roadShowLocations = roadShowLocations['RoadshowLocation'];

      // console.log(this.roadShowLocations);
    });
  }

  formInit() {
    this.roadShowForm = this.formBuilder.group({
      'date'      : this.date,
      'time'      : this.time,
      'company'    : this.company,
      'location'  : this.location,
      'seats'     : this.seats,
      'overview' : this.overview,
      'presenterMugshotURL' : this.presenterMugshotURL,
      'presenterBio' : this.presenterBio,
      'presenterName' : this.presenterName
    });

    // console.log('Roadshow: ' + this.roadShowForm);
  }

  onSubmit(values: any) {

    values.date = `${values.date.month}/${values.date.day}/${values.date.year}`;
    values.time = `${values.time.hour == 0 ? 12 : values.time.hour}:${values.time.minute}:00.000`;
    values.issuerId = values.company;
    values.locationId = values.location;

    values.imgContent = this.speaker_photo;
    values.menuContent = this.menuContent;

    this.roadshowService.saveRoadShow(values).subscribe(
      res => {
        // console.log(res);
      }
    );
    this.roadShowForm.reset();
    setTimeout(() => { this.back(); }, 100);
  }

  updateSeats(id) {
    // console.log(id);
    // const seat = this.roadShowForm.controls['seats'];
    this.roadShowLocations.forEach(element => {
      if (element.id === Number(id)) {
        this.seats = element.maxSeats;
        // console.log(element);
        this.roadShowForm.controls['seats'].setValue(element.maxSeats);
        // seat.setValue(element.maxSeats);
      }
    });
    // const seatsAvailable = this.roadShows.find(roadShow => roadShow.city == city).seats;
    // this.seats.setValue(seatsAvailable);
  }

  back() {
    this.router.navigate(['admin/roadshows/list']);
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.speaker_photo = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.isNewlyUploaded = true;
    }
  }

  readMenuUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.menuContent = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.isNewlyUploaded = true;
    }
  }

  removePhoto() {
    const confirmation = confirm('Are you sure you want to remove the photo?');
    // console.log(confirmation);
    if (confirmation) {
      this.speaker_photo = null;
      this.isNewlyUploaded = false;
    }
  }
}
