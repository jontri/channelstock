import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rom-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  companyModel: any;

  save(){

  }

  constructor() { }

  ngOnInit() {
  }

  bindFile(event) {
    console.log(event);
    this.companyModel = event.target.files[0].name;
  }

}
