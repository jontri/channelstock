import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'rom-analysts',
  templateUrl: './analysts.component.html',
  styleUrls: ['./analysts.component.scss']
})
export class AnalystsComponent implements OnInit {

  private el: HTMLElement;

  @ViewChild('modal1') openModal: ElementRef; //Michael Kupinski
  @ViewChild('modal2') openModal2: ElementRef; //Michael Heim
  @ViewChild('modal3') openModal3: ElementRef; //Mark Reichman
  @ViewChild('modal4') openModal4: ElementRef; //Poe Fratt
  @ViewChild('modal5') openModal5: ElementRef; //Cosme Ordonez
  @ViewChild('modal6') openModal6: ElementRef; //Christian Herbosa
  @ViewChild('modal7') openModal7: ElementRef; // Joe Gomez
  @ViewChild('modal8') openModal8: ElementRef; //Ahu Demir
  constructor(

  ) {
  }

  ngOnInit() {
  }

  onMouseEnter($event) {
    console.log("mouse enter to Michael Kupinski + " + $event.type);
    this.openModal.nativeElement.click();
  }
  onMouseEnterHeim() {
    console.log("mouse enter to Michael Heim");
    this.openModal2.nativeElement.click();
  }
  onMouseEnterReichman() {
    console.log("mouse enter to Mark Reichman");
    this.openModal3.nativeElement.click();
  }
  onMouseEnterFratt() {
    console.log("mouse enter to Poe Fratt");
    this.openModal4.nativeElement.click();
  }
  onMouseEnterOrdonez() {
    console.log("mouse enter to Cosme Ordonez");
    this.openModal5.nativeElement.click();
  }
  onMouseEnterHerbosa() {
    console.log("mouse enter to Christian Herbosa");
    this.openModal6.nativeElement.click();
  }
  onMouseEnterGomez() {
    console.log("mouse enter to Joe Gomez");
    this.openModal7.nativeElement.click();
  }
  onMouseEnterDemir() {
    console.log("mouse enter to Ahu Demir");
    this.openModal8.nativeElement.click();
  }

}
