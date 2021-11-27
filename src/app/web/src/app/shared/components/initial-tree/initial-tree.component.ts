import {Component, Input, OnInit} from '@angular/core';
import { ResponsiveService } from '@shared/services';

@Component({
  selector: 'rom-initial-tree',
  templateUrl: './initial-tree.component.html',
  styleUrls: ['./initial-tree.component.scss']
})
export class InitialTreeComponent implements OnInit {
  @Input() isHideLogo: Boolean;
  constructor(
    public responsiveService: ResponsiveService
  ) { }

  ngOnInit() {
  }

}
