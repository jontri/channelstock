import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Observable, forkJoin } from 'rxjs';

import { CompanyService } from '../../../api/company/company.service';
import { RoadShowService } from '../../../api/road-shows/road-shows.service';
import { RoadShowLocationService } from '../../../api/road-show-location/road-show-location.service';
import { RoadShow } from '@models';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { isMoment } from '../../../../../node_modules/moment';


@Component({
  selector: 'rom-edit-roadshow',
  templateUrl: './edit-roadshow.component.html',
  styleUrls: ['./add-roadshow.component.scss', '../../admin.component.scss']

})
export class EditRoadshowComponent implements OnInit {
  companies: any[];
  roadShows: any[];
  roadShowLocations: any[];
  r: RoadShow[];
  roadShow: RoadShow;
  roadShowForm: FormGroup;
  speaker_photo: any;
  isNewlyUploaded: Boolean = false;
  date      = new FormControl('', [ Validators.compose([Validators.required])]);
  time      = new FormControl('', [ Validators.compose([Validators.required])]);
  company   = new FormControl('', [ Validators.compose([Validators.required])]);
  location = new FormControl('', [ Validators.compose([Validators.required])]);
  seats     = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  overview = new FormControl('', [ Validators.compose([Validators.required])]);
  id       = new FormControl();
  version  = new FormControl();
  deleted  = new FormControl();
  dirty  = new FormControl();
  lastModified  = new FormControl();
  issuer  = new FormControl();
  roadshowLocation = new FormControl();
  presenterBio = new FormControl();
  presenterName = new FormControl();
  presenterMugshotURL = new FormControl();
  menuLink = new FormControl();
  imgContent = new FormControl();
  menuContent: any = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private roadshowService: RoadShowService,
    private roadShowLocationService: RoadShowLocationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.roadshowService.getRoadShowById(this.route.snapshot.params['id']).subscribe(
      res => {
        this.r = res;
      }
    );

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

      this.formInit();
    });
  }

  formInit() {
    this.roadShow = this.r['Roadshow'];
    // console.log(this.roadShow);
    var sched = new Date (this.roadShow.date);
    var year = sched.getFullYear();
    var month = sched.getMonth() + 1;
    var day = sched.getDate();
    var hours = sched.getHours();
    var min = sched.getMinutes();

    console.log('this.roadShow.date:', this.roadShow.date);
    console.log('sched:', sched);
    console.log('hours:', hours);
    console.log('min:', min);

    this.roadShowForm = this.formBuilder.group({
      'date'      : { year: year, month: month, day: day },
      'time'      : { hour: hours, minute : min },
      'company'    : this.roadShow.issuerId,
      'location'  : this.roadShow.locationId,
      'seats'     : this.roadShow.seats,
      'overview' : this.roadShow.overview,
      'id'    : this.roadShow.id,
      'version' : this.roadShow.version,
      'dirty' : this.roadShow.dirty,
      'deleted' : this.roadShow.deleted,
      'lastModified' : this.roadShow.lastModified,
      'presenterMugshotURL' : this.roadShow.presenterMugshotURL,
      'presenterBio' : this.roadShow.presenterBio,
      'presenterName' : this.roadShow.presenterName,
      'menuLink' : this.roadShow.menuLink
    });
  }

  onSubmit(values: any) {

    values.date = `${values.date.month}/${values.date.day}/${values.date.year}`;
    values.time = `${values.time.hour == 0 ? 12 : values.time.hour}:${values.time.minute}:00.000`;
    values.issuerId = values.company;
    values.locationId = values.location;
    values.menu = '';
    values.imgContent = this.speaker_photo;
    values.menuContent = this.menuContent;

    // console.log('form values', values);
    this.roadshowService.updateRoadShow(values).subscribe(
      res => {
        // console.log(res);
      }
    );
    this.roadShowForm.reset();
    setTimeout(() => { this.back(); }, 100 );
  }

  updateSeats(city: string): void {
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
