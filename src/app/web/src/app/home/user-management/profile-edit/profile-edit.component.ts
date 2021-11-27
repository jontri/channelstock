import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService, LookupsService } from '@api';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Lookup } from '@models';
import { PasswordValidationDirective } from '@shared/directives';
 
@Component({
  selector: 'rom-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  
  userProfile: any;
  userForm: FormGroup;
  accountObj: any;
  accountFailedMsg: any;
  accountSuccessMsg: any;
  @Input() usstates: Lookup;
  @Input() countries: Lookup;

  constructor(private userManagementService: UserManagementService, private router: Router, private formBuilder: FormBuilder, private lookupsService:LookupsService ) { 
    if(!this.userProfile){
      this.userProfile={};
    }
  }

  getUser(emailAddress) {
    this.userManagementService.adminGetUserProfile(emailAddress)
      .subscribe(
                  res => {
                          this.userProfile = res['userProfile'];
                        });
  }

  ngOnInit() {

    let loggedUser = sessionStorage.getItem('LOGGED_USER');
    this.getUserProfile(loggedUser);

    this.formInit();
    this.getAllUSStates();
    this.getAllCountries();
  }

  formInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required, Validators.email])],
      address1: ['', Validators.compose([Validators.required])],
      address2: [''],
      city: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required])],
      password: ['', [ Validators.minLength(8), Validators.maxLength(15) ]],
      crmPassword: ['']
    }, { validator: PasswordValidationDirective.MatchPassword });
  }

  isFieldValid(field: string) {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSubmit() {

    if(this.userForm.valid){
      console.log('******* onSubmit() ');
      this.userManagementService.updateUserProfile(this.userProfile)
      .subscribe( data =>{
        this.accountObj = data['result'];
        console.log("MESSAGE: " + this.accountObj.messageDesc);

        if(data['result'].message == "SUCCESS"){
          this.accountFailedMsg = '';
          this.accountSuccessMsg = this.accountObj.messageDesc;
        } else {
          this.accountSuccessMsg = '';
          this.accountFailedMsg = this.accountObj.messageDesc;
        }         
      });

      this.userProfile.password='';
      this.userProfile.crmPassword='';
      
    } else{
      this.validateAllFormFields(this.userForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  reset(){
    this.userForm.reset();
  }

  getAllUSStates(): void {
    this.lookupsService.getAllUSStates()
        .subscribe(usstates => {
                  this.usstates = usstates['lookup']; });
  } 
  
  getAllCountries(): void {
    this.lookupsService.getAllCountries()
        .subscribe(countries => {
                    this.countries = countries['lookup']; 
                  });
  }  

  getUserProfile(emailAddress: String): void  {
    this.userManagementService.getUserProfile(emailAddress)
    .subscribe(userProfile => {
                                this.userProfile = userProfile['userProfile'];
                              });       
  }

  resetData(): void{
    let loggedUser = sessionStorage.getItem('LOGGED_USER');
    this.getUserProfile(loggedUser);
  }
}
