import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'rom-register-now',
  templateUrl: './register-now.component.html',
  styleUrls: ['./register-now.component.scss']
})
export class RegisterNowComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('registerNowTrigger') registerNowTrigger: ElementRef;
  @ViewChild('registerNowModal') registerNowModal: ElementRef;

  private _isOpen = false;

  currStep: string;

  @Input()
  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    if (isOpen) {
      this.registerNowTrigger.nativeElement.click();
      this.currStep = 'entry';
    }
  }
  get isOpen(): boolean { return this._isOpen; }

  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.registerNowModal.nativeElement).on('hide.bs.modal', this.close.bind(this));
  }

  ngOnDestroy() {
    this.clear();
    $(this.registerNowModal.nativeElement).off('hide.bs.modal');
  }

  close() {
    console.log("Closing register-now manually");
    this.isOpenChange.emit(this.isOpen = false);
    this.currStep = '';
  }

  onClose(status: string) {
    console.log("Closing register-now reset pass");
    this.isOpenChange.emit(this.isOpen = false);
    this.currStep = '';
  }

  onChange(status: string) {
    if (status === 'done') {
      this.clear();
    } else {
      this.currStep = status;
    }
  }

  private clear(): void {
    sessionStorage.removeItem('TMP_USERNAME');
    sessionStorage.removeItem('TMP_ACCNT_STATUS');
    sessionStorage.removeItem('TMP_PASSWORD');
    this.close();
    this.registerNowTrigger.nativeElement.click();
  }
}
