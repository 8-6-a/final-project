import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrayersService } from '../prayers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PrayersComponent implements OnInit {
  prayers: any;
  prayer: any;

  // creates a new prayer 
  create() {
    console.log("create a prayer");
    this.PrayersService.createPrayers(this.prayer).subscribe(() => {
      window.location.reload();
    });
  }

  // edits a current prayer
  edit(id, description) {
    console.log("edit prayers");
    const newPrayer = window.prompt(`Update Prayer:`);
    this.PrayersService.editPrayers(id, newPrayer).subscribe(() => {
      window.location.reload();
    });
  }

  // answers a prayer 
  answeredPrayer(id) {
    this.PrayersService.markPrayerAnswered(id).subscribe(() => {
      window.location.reload();
    });
  }

  // deletes a prayer
  delete(id) {
    this.PrayersService.deletePrayers(id).subscribe(() => {
      window.location.reload();
    });
  }

  // logs the user out of the session by deleting the token
  logout() {
    localStorage.removeItem('token')
    this.router.navigate(["/login"])
  }

  // makes the header links scroll to the page section it corresponds to
  scrollToElement($element): void {
    console.log($element);
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  constructor(
    private PrayersService: PrayersService,
    private router: Router
  ) {
    this.PrayersService.getPrayers().subscribe((data: any) => {
      console.log(data);
      this.prayers = data;
    });
  }

  ngOnInit() {
    this.prayer = {};
  }
}