import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrayersService {

  getPrayers() {
    console.log("getting prayers");
    return this.http.get(`${window.location.origin}/prayers`);
  }

  createPrayers(prayer) {
    console.log(prayer);
    return this.http.post(`${window.location.origin}/prayers`, prayer);
  }

  editPrayers(prayer, id) {
    return this.http.put(`${window.location.origin}/prayers/${id}`, {description: prayer});
  }

  deletePrayers(id) {
    return this.http.delete(`${window.location.origin}/prayers/${id}`);
  }

  markPrayerAnswered(id) {
    console.log("marking prayer answered");
    return this.http.put(`${window.location.origin}/prayers/answered/${id}`, null);
  }

  constructor(private http: HttpClient) {

  }
}
