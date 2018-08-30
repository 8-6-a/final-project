import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrayersService } from '../prayers.service';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrayersComponent implements OnInit {
  prayers: any;
  prayer: any;

  create() {
    console.log("create a prayer");
    this.PrayersService.createPrayers(this.prayer).subscribe(() => {
      window.location.reload();
    });
  }

  edit(id, description) {
    console.log("edit prayers");
    const newPrayer = window.prompt(`Update Prayer:`);
    this.PrayersService.editPrayers(id, newPrayer).subscribe(() => {
      window.location.reload();
    });
  }

  answeredPrayer(id){
    this.PrayersService.markPrayerAnswered(id).subscribe(() => {
      window.location.reload();
    });
  }

  delete(id) {
    this.PrayersService.deletePrayers(id).subscribe(() => {
      window.location.reload();
    });
  }

  constructor(private PrayersService: PrayersService) {
    this.PrayersService.getPrayers().subscribe((data: any) => {
      console.log(data);
      this.prayers = data;
    });
  }

  ngOnInit() {
    this.prayer = {};
  }

}