import { Component, OnInit } from "@angular/core";
import { TabItem, Mover } from "@models";
import { MoversService } from "@api";

@Component({
  selector: "rom-movers-expanded",
  templateUrl: "./movers-expanded.component.html",
  styleUrls: ["./movers-expanded.component.scss"]
})
export class MoversExpandedComponent implements OnInit {
  items: TabItem[];
  private movers: Mover;

  constructor(private moversService: MoversService) {
    this.items = [];
  }

  ngOnInit() {
    this.moversService.getMovers().subscribe(data => {
      this.movers = data["moverList"];
      // this.movers = data;
      console.log(this.movers);

      // Populate tab items.
      for (const prop in this.movers) {
        if (this.movers.hasOwnProperty(prop)) {
          const item = {
            id: prop,
            contentId: `${prop}-tab`,
            name: prop,
            selected: prop === "winners",
            content: this.movers[prop]
          };
          item.content.name = prop;
          this.items.push(item);
        }
      }

      // Sort tab items.
      this.items.sort((leftSide: TabItem, rightSide: TabItem) => {
        if (leftSide.name === "winners" || rightSide.name === "actives") {
          return -1;
        }
        if (leftSide.name === "actives" || rightSide.name === "winners") {
          return 1;
        }
        return 0;
      });
    });
  }

  expand(toggle) {
    this.moversService.expandListener.next(toggle);
  }
}
