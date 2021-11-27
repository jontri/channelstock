import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LoginService } from '@api';
import { AuthService } from '@shared/services';

@Component({
  selector: 'rom-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  private static GRAY_CHECKS = [0, 0, 0, 0, 0];

  @Input() value: number;

  checks: number[];

  constructor(
    public loginService: LoginService,
    private authService: AuthService
  ) {
    this.buildChecks();
  }

  ngOnChanges() {
    this.buildChecks();
  }

  private buildChecks(): void {
    if (!this.value) {
      this.checks = RatingComponent.GRAY_CHECKS;
    } else {
      if (this.value > 5) {
        // then convert value to between 0 and 5
        this.value = this.value * 5 / 100;
      }
      const greenChecks = Math.floor(this.value);
      const partialGreenCheck = this.value - greenChecks;

      this.checks = this.checks.map((val, index) => {
        if (index < greenChecks) {
          // set to 100%
          return 100;
        }
        if (index < greenChecks + 1) {
          // percentage of partial green check
          return partialGreenCheck * 100;
        }
        // 0% is gray check
        return 0;
      });
    }
  }

  login(e: Event): void {
    this.authService.toggleRegister();
    e.stopPropagation();
  }
}
