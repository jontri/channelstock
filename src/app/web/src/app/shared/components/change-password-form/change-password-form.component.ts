import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { passwordValidator } from '@shared/validators';

@Component({
  selector: 'rom-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnInit {
  @Input() submit: Observable<void>;
  @Output() passwordChanged: EventEmitter<string>;

  setupPwdForm: FormGroup;
  frmPassword: FormControl;
  frmConfirmPassword: FormControl;
  pwdNotMatch: string;
  successMsg: string;

  constructor() {
    this.passwordChanged = new EventEmitter<string>();
  }

  ngOnInit() {
    this.createForm();
    this.submit.subscribe(this.onSetupPassword.bind(this));
  }

  createForm() {
    this.frmPassword = new FormControl('', [
      Validators.required,
      passwordValidator
    ]);

    this.setupPwdForm = new FormGroup({
      frmPassword: this.frmPassword
    });
  }

  onSetupPassword(event: Event) {
    console.log('ON CHANGING PASSWORD!');

    this.setupPwdForm.controls['frmPassword'].markAsDirty();

    if (this.setupPwdForm.valid) {
      this.passwordChanged.emit(this.frmPassword.value);
      this.successMsg = "Password successfully changed.";
    }
  }
}
