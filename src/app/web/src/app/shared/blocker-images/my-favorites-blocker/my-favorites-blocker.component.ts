import { Component } from '@angular/core';
import { AuthService } from '@shared/services';

@Component({
  selector: 'rom-my-favorites-blocker',
  templateUrl: './my-favorites-blocker.component.html',
  styleUrls: ['./my-favorites-blocker.component.scss']
})
export class MyFavoritesComponent {
  constructor(
    private authService: AuthService
  ) { }

  openDialog(url) {
    window.open(url, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=200,width=1000,height=700');
  }

  register() {
    this.authService.toggleRegister();
  }
}
