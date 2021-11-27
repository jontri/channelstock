import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Mover, TabItem } from '@models';
import { MoversService } from '@api';
import { ActivatedRoute, Data } from '@angular/router';
import { Location } from '@angular/common';
import { AuxiliaryGuard } from '../auxiliary-guard/auxiliary.guard';

@Component({
  selector: 'rom-movers',
  templateUrl: './movers.component.html',
  styleUrls: ['./movers.component.scss']
})

export class MoversComponent implements OnInit, AfterViewInit {
  items: TabItem[];

  private movers: Mover;
  private isExpanded: boolean;

  constructor(
    private moversService: MoversService,
    private route: ActivatedRoute,
    public location: Location,
    public aux: AuxiliaryGuard
  ) {
    this.items = [];
    this.route.data.subscribe((data: Data) => this.isExpanded = data.isExpanded);
  }

  ngOnInit() {
    this.moversService.getMovers().subscribe(data => {
      this.movers = data['moverList'];
      // this.movers = data;
      // console.log(this.movers);

      // Populate tab items.
      for (const prop in this.movers) {
        if (this.movers.hasOwnProperty(prop)) {
          this.items.push({
            id: prop,
            contentId: `${prop}-tab`,
            name: prop,
            selected: prop === 'winners',
            content: this.movers[prop] instanceof Array ? this.movers[prop] : [this.movers[prop]]
          });
        }
      }

      // Sort tab items.
      this.items.sort((leftSide: TabItem, rightSide: TabItem) => {
        if (leftSide.name === 'winners' || rightSide.name === 'actives') {
          return -1;
        }
        if (leftSide.name === 'actives' || rightSide.name === 'winners') {
          return 1;
        }
        return 0;
      });
    });
  }

  ngAfterViewInit() {
    $(function () {
      (<any>$('[data-toggle="tooltip"]')).tooltip();
    });
  }
}
