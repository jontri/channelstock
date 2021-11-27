import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-shared-home',
  templateUrl: './shared-home.component.html',
  styleUrls: ['./shared-home.component.scss']
})
export class SharedHomeComponent implements OnInit {

  constructor(
    public responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
  }

}
