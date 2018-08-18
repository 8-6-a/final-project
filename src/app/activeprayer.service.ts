import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActiveprayerService {

  getActiveprayer() {
    return this.http.get(`${window.location.origin}/activeprayer`);
  }

  createActiveprayer(activeprayer) {
    return this.http.post(`${window.location.origin}/activeprayer`, activeprayer);
  }

  editActiveprayer(activeprayer, id) {
    return this.http.put(`${window.location.origin}/activeprayer/${id}`, {description: activeprayer});
  }

  deleteActiveprayer(id) {
    return this.http.delete(`${window.location.origin}/activeprayer/${id}`);
  }

  constructor(private http: HttpClient) {

  }
}