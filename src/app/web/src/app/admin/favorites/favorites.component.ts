import { Component, OnInit } from '@angular/core';
import { NewsService } from '@api';
import { News } from '@models';

@Component({
  selector: 'rom-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})

export class FavoritesComponent implements OnInit {

  constructor() { }

   ngOnInit() {

  }

}
