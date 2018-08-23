import { Component, OnInit } from '@angular/core';
import { PrayersService } from '../prayers.service';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.css']
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

  edit(prayer) {
    console.log("edit prayers");
    const newPrayer = window.prompt(`Update Prayer: ${prayer.description}`);
    this.PrayersService.editPrayers(newPrayer, prayer._id).subscribe(() => {
      window.location.reload();
    });
  }

  answeredPrayer(id){
    this.PrayersService.markPrayerAnswered(id).subscribe(() => {
      
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
