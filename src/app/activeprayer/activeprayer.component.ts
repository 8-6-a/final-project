import { Component, OnInit } from '@angular/core';
import { ActiveprayerService } from '../activeprayer.service';

@Component({
  selector: 'app-activeprayer',
  templateUrl: './activeprayer.component.html',
  styleUrls: ['./activeprayer.component.css']
})
export class ActiveprayerComponent implements OnInit {
  activeprayers: any;
  activeprayer: any;

  create() {
    this.activeprayerService.createActiveprayer(this.activeprayer).subscribe(() => {
      window.location.reload();
    });
  }

  edit(td) {
    let newActiveprayer = window.prompt(`Update Activeprayer: ${td.description}`);
    this.activeprayerService.editActiveprayer(newActiveprayer, td._id).subscribe(() => {
      window.location.reload();
    });
  }

  delete(id) {
    this.activeprayerService.deleteActiveprayer(id).subscribe(() => {
      window.location.reload();
    });
  }

  constructor(private activeprayerService: ActiveprayerService) {
    this.activeprayerService.getActiveprayer().subscribe((data: any) => {
      this.activeprayer = data;
    });
  }

  ngOnInit() {
    this.activeprayer = {}
  }

}
