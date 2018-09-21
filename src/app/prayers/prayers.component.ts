import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PrayersService } from "../prayers.service";
import { Router } from "@angular/router";
import { async } from "@angular/core/testing";


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

@Component({
  selector: "app-prayers",
  templateUrl: "./prayers.component.html",
  styleUrls: ["./prayers.component.css"],
  encapsulation: ViewEncapsulation.None
})

export class PrayersComponent implements OnInit {
  prayers: any;
  prayer: any;
  userId: any;
  header: any;

  // creates a new prayer
  create() {
    this.PrayersService.createPrayers({ prayer: this.prayer, userId: this.userId }).subscribe(() => {
      this.header = " You created a Prayer, View it in Active Prayers "
      sleep(2000).then(() => {
        window.location.reload() 
        })
    })
  }


  // edits a current prayer
  edit(id, description, userId) {
    if (userId !== this.userId) {
      this.header = "Not Allowed"
    } else {
      const newPrayer = window.prompt(`Update Prayer: ${description}`);
      if (!newPrayer) {
        return
      }
      this.PrayersService.editPrayers(id, newPrayer, userId).subscribe(() => {
        this.header = " You have edited your Prayer "
        sleep(2000).then(() => {
          window.location.reload() 
          })
      });
    }
  }

  // answers a prayer
  answeredPrayer(id, userId) {
    if (userId !== this.userId) {
      this.header = " Not Allowed"
    } else {
      this.PrayersService.markPrayerAnswered(id).subscribe(() => {
        this.header =
        "Praise God! Your prayer was answered, View it in Testimonies"
        sleep(2000).then(() => {
        window.location.reload() 
        })
      })
    }
  }

  // deletes a prayer
  delete(id) {
    this.PrayersService.deletePrayers(id).subscribe(() => {
      window.location.reload();
      event.preventDefault();
    });
  }

  // logs the user out of the session by deleting the token
  logout() {
    localStorage.removeItem("token")
    this.header = " You are being logged out "
    sleep(2000).then(() => {
    this.router.navigate(["/login"])
    })
  }

  // makes the header links scroll to the page section it corresponds to
  scrollToElement($element): void {
    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  constructor(
    private PrayersService: PrayersService,
    private router: Router,
    
  ) {

    this.PrayersService.getPrayers().subscribe((data: any) => {
      //console.log(data);
      this.prayers = data;
    });

    {
      let token = window.localStorage.token;
      let payload = token ? JSON.parse(window.atob(token.split(".")[1])) : null;
      this.userId = payload.id;
    }
  }

  ngOnInit() {
    this.prayer = {}
    this.header = ' ...for My house will be called a house of Prayer for the nations.  Isaiah 56:7 '
  }
}
