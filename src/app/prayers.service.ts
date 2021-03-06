import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PrayersService {
  getPrayers() {
    return this.http.get(`${window.location.origin}/prayers`);
  }

  createPrayers(prayer) {
    //console.log(prayer);
    return this.http.post(`${window.location.origin}/prayers`, prayer);
  }

  editPrayers(id, description, userId) {
    return this.http.put(`${window.location.origin}/prayers/${id}`, { description: description, userId: userId }
    );
  }

  markPrayerHelper(id, userId) {
    return this.http.post(`${window.location.origin}/prayers/helper/${id}`, { userId: userId });
  }

  deletePrayers(id) {
    return this.http.delete(`${window.location.origin}/prayers/${id}`);
  }

  markPrayerAnswered(id) {
    return this.http.put(
      `${window.location.origin}/prayers/answered/${id}`,
      null
    );
  }

  constructor(private http: HttpClient) {
    let token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else
      token => {
        window.location.href = "/home";
      };
  }
}