import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { style, animate, transition, trigger } from '@angular/animations';

import { PreferencesService } from '../../api/preferences/preferences.service';

import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '@models';

@Component({
  selector: 'rom-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(200, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity: 0}))
      ])
    ])
  ]
})
export class PreferencesComponent implements OnInit {
  type: any = '1';
  preferenceForm: FormGroup;
  isRegisteredInvestor: Boolean = false;
  familiarity: any = {};
  preference: any = {};
  sectors: any = [ 'test' ];
  accountFailedMsg: any;
  accountSuccessMsg: any;

  userProfile: any;
  _investorTypes: String[] = ['Family Office', 'Self Directed Investor', 'Institutional Fund', 'Registered Investment Advisor'];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private preferencesService: PreferencesService,
    private activeRoute: ActivatedRoute,
  ) {

    if (!this.userProfile) {
      this.userProfile = {}
    }
    this.formInit();

  }

  ngOnInit() {
    window.scrollTo(0, 0);

    let loggedUser = sessionStorage.getItem('LOGGED_USER');
    this.getUserProfile(loggedUser);

  }

  getUserProfile(emailAddress: String): void  {
    this.preferencesService.getUserProfile(emailAddress)
    .subscribe(userProfile => {
      this.userProfile = userProfile['userProfile'];

      console.log(this.userProfile);
    });
  }

  isFieldValid(field: string) {

    if( !this.preferenceForm.get(field) ) {
     console.log("Field name invalid - check your form html: " + field);
   }

    return !this.preferenceForm.get(field).valid && this.preferenceForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  formInit() {

    this.preferenceForm = this.formBuilder.group({

      // id: this.userProfile.id,
      participationType: '',
      firstName: ['', Validators.compose([Validators.required])],
      middleName: [''],
      lastName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required])],

      // address
      city: ['', Validators.compose([Validators.required])],
      address1: ['', Validators.compose([Validators.required])],
      address2: [''],
      state: ['', Validators.compose([Validators.required])],
      zipCode: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],

      // phone
      phoneNumber: ['', Validators.compose([Validators.required])],
      otherNumber: ['', Validators.compose([Validators.required])],

      // job related
      occupation: ['', Validators.compose([Validators.required])],
      yrsOfExperience: ['', Validators.compose([Validators.required])],
      jobTitle: ['', Validators.compose([Validators.required])],

      // sector interest
      isNaturalResources: '',
      isHealthCare: '',
      isGoodServices: '',
      isIndustrials: '',
      isTechnology: '',
      isEntertainment: '',
      isAllAny: '',

      // sectors
      sector1: ['', Validators.compose([Validators.required])],
      sector2: ['', Validators.compose([Validators.required])],
      sector3: ['', Validators.compose([Validators.required])],
      sector4: ['', Validators.compose([Validators.required])],
      sector5: ['', Validators.compose([Validators.required])],
      sector6: ['', Validators.compose([Validators.required])],
      crd: ['', Validators.compose([Validators.required])],


      // isFinra
      isFinra: ['', Validators.compose([Validators.required])],
      investibleAssets: ['', Validators.compose([Validators.required])],
      yrsOfInvestmentExp: ['', Validators.compose([Validators.required])],
      investmentTime: ['', Validators.compose([Validators.required])],
      annualReturn: ['', Validators.compose([Validators.required])],
      marketCap: ['', Validators.compose([Validators.required])],
      riskToleranceHigh: ['', Validators.compose([Validators.required])],
      riskToleranceMedium: ['', Validators.compose([Validators.required])],
      riskToleranceLow: ['', Validators.compose([Validators.required])],
      investorType: [''],

      isBonds: '',
      isAnnuities: '',
      isMutualFunds: '',
      isPrivatePlacements: '',
      isEquities: '',
      isRealEstate: '',

      awareOfManagementTeam: '',
      newInitiationsOfResearch: '',
      updateUpcomingInvestorConf: '',
      accreditedInvestor: ['', Validators.compose([Validators.required])]

      });

    }

    onSubmit(values: any) {

          values.participationType = values.participationType;
          values.id = this.userProfile.id;
          values.firstName = values.firstName;
          values.middleName = values.middleName;
          values.lastName = values.lastName;
          values.emailAddress = values.emailAddress;

          // address
          values.address1 = values.address1;
          values.address2 = values.address2;
          values.city = values.city;
          values.state = values.state;
          values.zipCode =values.zipCode;
          values.country = values.country;

          values.otherNumber = values.otherNumber;
          values.phoneNumber = values.phoneNumber;

          values.occupation = values.occupation;
          values.yrsOfExperience = values.yrsOfExperience;
          values.jobTitle = values.jobTitle;

          values.isNaturalResources = values.isNaturalResources;
          values.isHealthCare = values.isHealthCare;
          values.isGoodServices = values.isGoodServices;
          values.isIndustrials = values.isIndustrials;
          values.isTechnology = values.isTechnology;
          values.isEntertainment = values.isEntertainment;
          values.isAllAny = values.isAllAny;

          values.sector1 = values.sector1;
          values.sector2 = values.sector2;
          values.sector3 = values.sector3;
          values.sector4 = values.sector4;
          values.sector5 = values.sector5;
          values.sector6 = values.sector6;

          values.isFinra = values.isFinra;


          values.crd = values.crd;
          values.yrsOfInvestmentExp = values.yrsOfInvestmentExp;
          values.isBond = values.isBond;
          values.isAnnuities = values.isAnnuities;
          values.isMutualFunds = values.isMutualFunds;
          values.isPrivatePlacements = values.isPrivatePlacements;
          values.isEquities = values.isEquities;
          values.isRealEstate = values.isRealEstate;

          values.investibleAssets = values.investibleAssets;
          values.investmentTime = values.investmentTime;
          values.annualReturn = values.annualReturn;

          values.marketCap = values.marketCap;
          values.riskToleranceHigh = values.riskToleranceHigh;
          values.riskToleranceMedium = values.riskToleranceMedium;
          values.riskToleranceLow = values.riskToleranceLow;

          values.awareOfManagementTeam = values.awareOfManagementTeam;
          values.newInitiationsOfResearch = values.newInitiationsOfResearch;
          values.updateUpcomingInvestorConf = values.updateUpcomingInvestorConf;

          console.log('form values', values);

          this.preferencesService.updatePreferences(values).subscribe(
            data => {

              if(data['result'].message == "SUCCESS"){
                this.accountFailedMsg = '';
                this.accountSuccessMsg = data['result'].messageDesc;
              } else {
                this.accountSuccessMsg = '';
                this.accountFailedMsg = data['result'].messageDesc;
              }


            }
          );

          // this.preferenceForm.reset();
          // setTimeout(()=>{ this.back()}, 100)

    }
    back() {
      this.router.navigate(['admin/users/']);
  }

  toggleRegistered() {
    console.log(this.isRegisteredInvestor);
    if (this.isRegisteredInvestor) {
      // investor info
      this.preferenceForm.addControl('crd', new FormControl('', Validators.required));
      this.preferenceForm.addControl('investment_experience', new FormControl('', Validators.required));
      // other info
      this.preferenceForm.addControl('assets', new FormControl(''));
      this.preferenceForm.addControl('horizons', new FormControl(''));
      this.preferenceForm.addControl('return_expectation', new FormControl(''));
      this.preferenceForm.addControl('market_cap', new FormControl(''));
      this.preferenceForm.addControl('high', new FormControl(''));
      this.preferenceForm.addControl('medium', new FormControl(''));
      this.preferenceForm.addControl('low', new FormControl(''));
    } else {
      this.preferenceForm.removeControl('crd');
      this.preferenceForm.removeControl('investment_experience');
      this.preferenceForm.removeControl('assets');
      this.preferenceForm.removeControl('horizons');
      this.preferenceForm.removeControl('return_expectation');
      this.preferenceForm.removeControl('market_cap');
      this.preferenceForm.removeControl('high');
      this.preferenceForm.removeControl('medium');
      this.preferenceForm.removeControl('low');
    }
  }
}
