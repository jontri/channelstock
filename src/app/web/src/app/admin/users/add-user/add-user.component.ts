import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder,  FormControl } from '@angular/forms';
import { UserManagementService } from '@api';
import { Router } from '@angular/router';
import { LookupsService } from '@api';
import { Lookup } from '@models';

@Component({
  selector: 'rom-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userProfile: any = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    emailAddress: ''
  };

  userForm: FormGroup;
  accountObj: any;
  accountFailedMsg: any;
  @Input() usstates: Lookup;
  @Input() countries: Lookup;

  constructor(
    private userManagementService: UserManagementService,
    private lookupsService: LookupsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
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
      zipCode: ['', Validators.compose([Validators.required])]
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
    if (this.userForm.valid) {
        this.userManagementService.adminAddUser(this.userProfile).subscribe(
          data => {
            this.accountObj = data['result'];
            if (data['result'].message == 'SUCCESS') {
              this.router.navigate(['admin/users/list']);
            } else {
              this.accountFailedMsg = this.accountObj.messageDesc;
            }
          }, (error) => {
            console.log(error.message);
            this.accountFailedMsg = error.message;
          }
        );
    } else {
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

  reset() {
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
}
