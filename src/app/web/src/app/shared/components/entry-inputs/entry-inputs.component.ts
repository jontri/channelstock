import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { blankValidator, customEmailValidator } from '@shared/validators';

@Component({
  selector: 'rom-entry-inputs',
  templateUrl: './entry-inputs.component.html',
  styleUrls: ['./entry-inputs.component.scss']
})
export class EntryInputsComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;

  @Input() shouldNavigate = true;
  @Input() isMobile = false;
  @Input() isModal = false;

  @Output() romChange: EventEmitter<string> = new EventEmitter<string>();

  entryForm: FormGroup;
  headerDescription: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.entryForm = new FormGroup({
      frmUsername: new FormControl(
        sessionStorage.getItem('TMP_USERNAME') || '', [Validators.required, blankValidator, customEmailValidator]
      )
    }, {updateOn: 'submit'});
  }

  ngAfterViewInit() {
    if (this.input) {
      this.input.nativeElement.focus();
    }
  }

  redirectUser(event: Event) {
    if (this.entryForm.valid || this.entryForm.value.frmUsername.toLowerCase() === 'admin') {
      sessionStorage.setItem('TMP_USERNAME', this.entryForm.value.frmUsername);
      if (this.shouldNavigate) {
        this.router.navigate(['login']);
      } else {
        this.romChange.emit('login');
      }
    }
  }
}
