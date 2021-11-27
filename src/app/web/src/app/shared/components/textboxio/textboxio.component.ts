import { Component, AfterViewInit, Input, OnChanges, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';

declare const textboxio: any;

@Component({
  selector: 'rom-textboxio',
  templateUrl: './textboxio.component.html',
  styleUrls: ['./textboxio.component.scss']
})
export class TextboxioComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() name: string;
  @Input() value: string;
  @Input() idx: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  textboxioId: string;
  textboxioConfig: any;

  private textbox: any;
  private textboxValue: string;

  constructor() {
    this.textboxioConfig = {
      basePath : '/assets/textboxio-client/textboxio',
      images : {
        allowLocal : true,
        editing : {
           enabled : false
        }
      }
    };
  }

  ngOnInit() {

    this.name = this.name || 'content';
    this.textboxioId = `textboxio-${this.name}${this.idx}`;
    this.value = this.value || '';
  }

  ngAfterViewInit() {
    this.textbox = textboxio.replace(`#${this.textboxioId}`, this.textboxioConfig);
    this.textbox.events.change.addListener(this.textboxioContentChanged.bind(this));
    this.updateTextboxio(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.textbox && changes.value) {
      if (this.textboxValue !== changes.value.currentValue) {
        this.updateTextboxio(changes.value.currentValue);
        console.log(changes.value.currentValue);
      }
    }
  }

  private updateTextboxio(newVal: string): void {
    this.textbox.content.set(newVal);
    console.log(`${this.textboxioId} content set to -- ${newVal}`);
  }

  private textboxioContentChanged(): void {
    this.textboxValue = this.textbox.content.get();
    if (this.value !== this.textboxValue) {
      this.valueChange.emit(this.textboxValue);
      console.log(`${this.textboxioId} model value set to -- ${this.textboxValue}`);
    }
  }
}
