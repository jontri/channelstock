import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'rom-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: any = {
    message: ''
  };
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.feedbackForm = this.formBuilder.group({
      feedback: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    // Do nothing.
  }

}
