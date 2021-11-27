import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'rom-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  revenueForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder
  ) {
    this.initForm();
    this.setInitYears();
  }

  ngOnInit() {

  }

  initForm() {
    this.revenueForm = this.formBuilder.group({
      // 1st Period
      p1: ['', Validators.compose([Validators.required])],
      p1q1: ['', Validators.compose([Validators.required])],
      p1q2: ['', Validators.compose([Validators.required])],
      p1q3: ['', Validators.compose([Validators.required])],
      p1q4: ['', Validators.compose([Validators.required])],
      p1total: ['', Validators.compose([Validators.required])],

      // 2nd Period
      p2: ['', Validators.compose([Validators.required])],
      p2q1: ['', Validators.compose([Validators.required])],
      p2q2: ['', Validators.compose([Validators.required])],
      p2q3: ['', Validators.compose([Validators.required])],
      p2q4: ['', Validators.compose([Validators.required])],
      p2total: ['', Validators.compose([Validators.required])],

      // 3rd Period
      p3: ['', Validators.compose([Validators.required])],
      p3q1: ['', Validators.compose([Validators.required])],
      p3q2: ['', Validators.compose([Validators.required])],
      p3q3: ['', Validators.compose([Validators.required])],
      p3q4: ['', Validators.compose([Validators.required])],
      p3total: ['', Validators.compose([Validators.required])],

      // 4th Period
      p4: ['', Validators.compose([Validators.required])],
      p4q1: ['', Validators.compose([Validators.required])],
      p4q2: ['', Validators.compose([Validators.required])],
      p4q3: ['', Validators.compose([Validators.required])],
      p4q4: ['', Validators.compose([Validators.required])],
      p4total: ['', Validators.compose([Validators.required])],

      // revenue status
      note: ['', Validators.compose([Validators.required])]
    });
  }

  setInitYears() {
    const currentYear = Number(new Date(Date.now()).getFullYear());
    // Set form years to 3 latest years
    this.revenueForm.controls['p1'].setValue(currentYear - 2);
    this.revenueForm.controls['p2'].setValue(currentYear - 1);
    this.revenueForm.controls['p3'].setValue(currentYear);
  }

  save() {
    const data = {
      periods: [
        {
          q1: this.revenueForm.controls['p1q1'].value,
          q2: this.revenueForm.controls['p1q2'].value,
          q3: this.revenueForm.controls['p1q3'].value,
          q4: this.revenueForm.controls['p1q4'].value,
          total: this.revenueForm.controls['p1total'].value,
          period: this.revenueForm.controls['p1'].value
        },
        {
          q1: this.revenueForm.controls['p2q1'].value,
          q2: this.revenueForm.controls['p2q2'].value,
          q3: this.revenueForm.controls['p2q3'].value,
          q4: this.revenueForm.controls['p2q4'].value,
          total: this.revenueForm.controls['p2total'].value,
          period: this.revenueForm.controls['p2'].value
        },
        {
          q1: this.revenueForm.controls['p3q1'].value,
          q2: this.revenueForm.controls['p3q2'].value,
          q3: this.revenueForm.controls['p3q3'].value,
          q4: this.revenueForm.controls['p3q4'].value,
          total: this.revenueForm.controls['p3total'].value,
          period: this.revenueForm.controls['p3'].value
        },
      ],
      note: this.revenueForm.controls['note'].value
    };
  }

}
