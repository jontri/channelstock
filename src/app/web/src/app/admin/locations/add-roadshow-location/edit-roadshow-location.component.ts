import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '../../../../../node_modules/@angular/router';
import { RoadShowLocationService } from '../../../api/road-show-location/road-show-location.service';
import { RoadShowLocation } from '@models';

@Component({
  selector: 'rom-add-roadshow-location',
  templateUrl: './edit-roadshow-location.component.html',
  styleUrls: ['./add-roadshow-location.component.scss']
})
export class EditRoadshowLocationComponent implements OnInit {

  timezones = [
    {name: '(GMT -12:00)', value: '-12:00'},
    {name: '(GMT -11:00)', value: '-11:00'},
    {name: '(GMT -10:00)', value: '-10:00'},
    {name: '(GMT -9:00)', value: '-09:00'},
    {name: '(GMT -8:00)', value: '-08:00'},
    {name: '(GMT -7:00)', value: '-07:00'},
    {name: '(GMT -6:00)', value: '-06:00'},
    {name: '(GMT -5:00)', value: '-05:00'},
    {name: '(GMT -4:00)', value: '-04:00'},
    {name: '(GMT -3:00)', value: '-03:00'},
    {name: '(GMT -2:00)', value: '-02:00'},
    {name: '(GMT -1:00)', value: '-01:00'},
    {name: '(GMT)', value: '+00:00'},
    {name: '(GMT +1:00)', value: '+01:00'},
    {name: '(GMT +2:00)', value: '+02:00'},
    {name: '(GMT +3:00)', value: '+03:00'},
    {name: '(GMT +4:00)', value: '+04:00'},
    {name: '(GMT +5:00)', value: '+05:00'},
    {name: '(GMT +6:00)', value: '+06:00'},
    {name: '(GMT +7:00)', value: '+07:00'},
    {name: '(GMT +8:00)', value: '+08:00'},
    {name: '(GMT +9:00)', value: '+09:00'},
    {name: '(GMT +10:00)', value: '+10:00'},
    {name: '(GMT +11:00)', value: '+11:00'},
    {name: '(GMT +12:00)', value: '+12:00'}
    ];
  selectedTimezone: string;

  locationName           = new FormControl('', [ Validators.compose([Validators.required])]);
  address2        = new FormControl();
  address1         = new FormControl('', [ Validators.compose([Validators.required])]);
  stateUS           = new FormControl('', [ Validators.compose([Validators.required])]);
  cityOrLocality           = new FormControl('', [ Validators.compose([Validators.required])]);
  postalCode        = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  contact  = new FormControl('', [ Validators.compose([Validators.required])]);
  email   = new FormControl('', [ Validators.compose([Validators.required])]);
  maxSeats          = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  id       = new FormControl();
  version  = new FormControl();
  deleted  = new FormControl();
  dirty  = new FormControl();
  lastModified  = new FormControl();

  locationForm: any;
  RoadshowLocation: RoadShowLocation;
  locationImage: any;
  isNewlyUploaded: boolean;
  location: RoadShowLocation;
  r: RoadShowLocation[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private roadShowLocationService: RoadShowLocationService
  ) { }

  ngOnInit() {
    this.roadShowLocationService.getRoadShowLocationById(this.route.snapshot.params['id']).subscribe(
      res => {
        this.r = res;
        this.formInit();
      }
    );

  }

  selectTimezoneHandler (event: any) {
    this.selectedTimezone = event.target.value;
    console.log('timezone=', this.selectedTimezone);
  }

  formInit() {
    this.location = this.r['RoadshowLocation'];
    // console.log(this.location);
    this.locationForm = this.formBuilder.group({
      'id'    : this.location.id,
      'version' : this.location.version,
      'dirty' : this.location.dirty,
      'deleted' : this.location.deleted,
      'lastModified' : this.location.lastModified,
      'locationName'    : this.location.locationName,
      'address1'        : this.location.address.address1,
      'address2'        : this.location.address.address2,
      'stateUS'         : this.location.address.stateUS,
      'cityOrLocality'  : this.location.address.cityOrLocality,
      'postalCode'      : this.location.address.postalCode,
      'contact'         : this.location.contact,
      'email'           : this.location.email,
      'maxSeats'        : this.location.maxSeats,
      'locationImage'   : this.location.imageContent,
      'locationImageUrl' : this.location.locationImageUrl,
      'timezoneControl' : this.location.timezone
    });
  }

  onSubmit(values: any) {
    this.RoadshowLocation = {
                            timezone: values.timezoneControl,
                            id: values.id,
                            deleted: values.deleted,
                            dirty: values.dirty,
                            version: values.version,
                            lastModified: values.lastModified,
                            locationName: values.locationName,
                            email: values.email,
                            maxSeats: values.maxSeats,
                            contact: values.contact,
                            imageContent: this.locationImage,
                            address: {address1: values.address1, address2: values.address2,
                            stateUS: values.stateUS,
                            cityOrLocality: values.cityOrLocality, postalCode: values.postalCode}
                          };
    this.roadShowLocationService.updateRoadShowLocation(this.RoadshowLocation).subscribe(
      res => {
        // console.log (res);
      }
    );
    //this.locationForm.reset();
    setTimeout(()=>{ this.back()}, 100)
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.locationImage = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.isNewlyUploaded = true;
    }
  }

  back() {
    this.router.navigate(['admin/locations/list']);
  }
}
