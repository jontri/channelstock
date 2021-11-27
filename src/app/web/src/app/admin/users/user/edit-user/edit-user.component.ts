import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService, LookupsService, LoginService } from '@api';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Lookup } from '@models';

@Component({
  selector: 'rom-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userProfile: any;
  userForm: FormGroup;
  accountObj: any;
  accountFailedMsg: any;
  @Input() usstates: Lookup;
  @Input() countries: Lookup;
  @Input() roles: Lookup;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private lookupsService: LookupsService,
    private loginService: LoginService
  ) {
    if(!this.userProfile){
      this.userProfile={}
    }

    this.activeRoute.params.subscribe(
      params => {
        this.getUser(params.id);
      }
    );
  }

  getUser(emailAddress) {
    this.userManagementService.adminGetUserProfile(emailAddress)
      .subscribe(
                  res => {
                          this.userProfile = res['userProfile'];
                        });
  }

  ngOnInit() {
    this.formInit();
    this.getAllUSStates();
    this.getAllCountries();
    this.getAllRoles();
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
      role: ['', Validators.compose([Validators.required])]
    });
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
      this.userManagementService.adminEditUser(this.userProfile).subscribe(
        data => {
          this.accountObj = data['result'];
          if(data['result'].message == "SUCCESS"){
            this.router.navigate(['admin/users/list']);
          } else {
            this.accountFailedMsg = this.accountObj.messageDesc;
          } 
        }, (error) => {
          console.log(error.message);
          this.accountFailedMsg = error.message;
        }
      );
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
  
  getAllRoles(): void {
    this.lookupsService.getAllRoles()
        .subscribe(roles => {
                    this.roles = roles['lookup']; 
                  });
  }
}
