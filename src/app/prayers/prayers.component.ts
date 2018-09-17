import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { PrayersService } from "../prayers.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

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
  
  // creates a new prayer
  create() {
    this.PrayersService.createPrayers({prayer: this.prayer, userId: this.userId}).subscribe(() => {
      window.location.reload();
      this._flashMessagesService.show(
        "You created a Prayer, View it in Active Prayers",
        { cssClass: "alert-success", timeout: 3000 }
      );
      console.log("created a prayer");
    });
  }

  // edits a current prayer
  edit(id, description, userId) {
    //console.log(this.prayers._id, this.userId)
    if (userId !== this.userId) {
      alert("not allowed")
    } else {
      console.log("edit prayers");
      const newPrayer = window.prompt(`Update Prayer: ${description}`);
      if (!newPrayer){
        return
      }
      this.PrayersService.editPrayers(id, newPrayer, userId).subscribe(() => {
        window.location.reload();
        this._flashMessagesService.show(
          "You have edited a Prayer, View it in Active Prayers",
          { cssClass: "alert-success", timeout: 3000 }
        );
      });
    }
  }

  // answers a prayer
  answeredPrayer(id, userId) {
    if (userId !== this.userId) {
      alert("not allowed");
    } else {
      this.PrayersService.markPrayerAnswered(id).subscribe(() => {
        window.location.reload();
        this._flashMessagesService.show(
          "Praise God! Your prayer was answered, View it in Testimonies",
          { cssClass: "alert-success", timeout: 3000 }
        );
      });
    }
  }

  // deletes a prayer
  delete(id) {
    this.PrayersService.deletePrayers(id).subscribe(() => {
      window.location.reload();
    });
  }

  // logs the user out of the session by deleting the token
  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
    this._flashMessagesService.show(
      "You are logged out, Please log in to view Prayers",
      { cssClass: "alert-danger", timeout: 4000 }
    );
  }

  // makes the header links scroll to the page section it corresponds to
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private PrayersService: PrayersService,
    private router: Router
  ) {
    this.PrayersService.getPrayers().subscribe((data: any) => {
      console.log(data);
      this.prayers = data;
    });
    {
      let token = window.localStorage.token;
      let payload = token ? JSON.parse(window.atob(token.split(".")[1])) : null;
      console.log(payload.id); // prints out user id
      this.userId = payload.id;
      console.log(this.userId);
    }
  }

  ngOnInit() {
    this.prayer = {};
  }
}
