import { LocationsComponent } from './../locations.component';
import { state } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '../../../../../node_modules/@angular/router';
import { RoadShowLocationService } from '../../../api/road-show-location/road-show-location.service';
import { RoadShowLocation } from '@models';

@Component({
  selector: 'rom-add-roadshow-location',
  templateUrl: './add-roadshow-location.component.html',
  styleUrls: ['./add-roadshow-location.component.scss']
})


export class AddRoadshowLocationComponent implements OnInit {

  //name           = new FormControl('', [ Validators.compose([Validators.required])]);
  //address        = new FormControl();
  //street         = new FormControl('', [ Validators.compose([Validators.required])]);
  //city           = new FormControl('', [ Validators.compose([Validators.required])]);
  //zipCode        = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  //contactPerson  = new FormControl('', [ Validators.compose([Validators.required])]);
  //contactEmail   = new FormControl('', [ Validators.compose([Validators.required])]);
  //seats          = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
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
  timezone: string;
  locationName           = new FormControl('', [ Validators.compose([Validators.required])]);
  address2        = new FormControl();
  address1         = new FormControl('', [ Validators.compose([Validators.required])]);
  stateUS = new FormControl('', [ Validators.compose([Validators.required])]);
  cityOrLocality           = new FormControl('', [ Validators.compose([Validators.required])]);
  postalCode        = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  contact  = new FormControl('', [ Validators.compose([Validators.required])]);
  email   = new FormControl('', [ Validators.compose([Validators.required])]);
  maxSeats          = new FormControl('', [ Validators.compose([Validators.required, Validators.pattern(`[0-9()]*`)])]);
  locationImage: any;
  locationForm: FormGroup;
  RoadshowLocation: RoadShowLocation;
  isNewlyUploaded: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roadShowLocationService: RoadShowLocationService
  ) { }

  ngOnInit() {
    this.formInit();
  }


  selectTimezoneHandler (event: any) {
    this.timezone = event.target.value;
    console.log('timezone=', this.timezone);
  }

  formInit() {
    //this.locationForm = this.formBuilder.group({
      //'name'         : this.name,
      //'address'      : this.address,
      //'street'       : this.street,
      //'city'         : this.city,
      //'zipCode'      : this.zipCode,
      //'contactPerson': this.contactPerson,
      //'contactEmail' : this.contactEmail,
      //'seats'        : this.seats,
    //});
    this.locationForm = this.formBuilder.group({
      'locationName'    : this.locationName,
      'address1'        : this.address1,
      'address2'        : this.address2,
      'stateUS'         : this.stateUS,
      'cityOrLocality'  : this.cityOrLocality,
      'postalCode'      : this.postalCode,
      'contact'         : this.contact,
      'email'           : this.email,
      'maxSeats'        : this.maxSeats,
      'locationImage'   : this.locationImage,
      'timezoneControl' : this.timezone
    });
  }

  onSubmit(values: any) {
    //values.address = `${values.street}, ${values.city} ${values.zipCode}`;
    //console.log(values.address);
    //console.log('form values', values);
    this.RoadshowLocation = {
        timezone: values.timezoneControl,
        locationName: values.locationName,
        email: values.email,
        maxSeats: values.maxSeats,
        contact: values.contact,
        imageContent: this.locationImage,
        address: {
            address1: values.address1,
            address2: values.address2,
            stateUS: values.stateUS,
            cityOrLocality: values.cityOrLocality,
            postalCode: values.postalCode
        }
      };


    this.roadShowLocationService.saveRoadShowLocation(this.RoadshowLocation).subscribe(
      res => {
        // console.log (res);
      }
    );
    this.locationForm.reset();
    setTimeout(()=>{ this.back()}, 100);



  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.locationImage = (<FileReader>event.target).result;
        // console.log("locationImage: " + this.locationImage);
      };
      reader.readAsDataURL(event.target.files[0]);
      this.isNewlyUploaded = true;
    }
  }

  removePhoto() {
    const confirmation = confirm('Are you sure you want to remove the Image?');
    // console.log(confirmation);
    if (confirmation) {
      this.locationImage = null;
      this.isNewlyUploaded = false;
    }
  }

  back() {
    this.router.navigate(['admin/locations/list']);
  }
}
