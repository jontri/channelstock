import { Component, OnInit } from '@angular/core';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { MenuItem } from '@models';

@Component({
  selector: 'rom-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent extends ContextMenuComponent<MenuItem[]> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
