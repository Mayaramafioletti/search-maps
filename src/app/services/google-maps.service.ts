import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private apiKey = 'AIzaSyCM_YOOsnG5AZNh_ngbuFmLzpaaXfIJOCc';

  constructor(private http: HttpClient) { }

  getAddress(address: string): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
