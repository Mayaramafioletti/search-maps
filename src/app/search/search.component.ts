import { Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { GoogleMapsService } from '../services/google-maps.service';
import { GoogleMap } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [GoogleMap, CommonModule, FormsModule, HttpClientModule, MapComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements AfterViewInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;
  address: string = '';
  location: any;
  center: any;
  addressInvalid: boolean = false; // Variável para rastrear a validade do endereço

  constructor(private googleMapsService: GoogleMapsService) {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }

  searchAddress() {
    this.googleMapsService.getAddress(this.address).subscribe((result) => {
      if (result.results && result.results.length > 0) {
        this.location = result.results[0];
        this.center = {
          lat: this.location.geometry.location.lat,
          lng: this.location.geometry.location.lng
        };
        this.addressInvalid = false; // Endereço encontrado
      } else {
        this.addressInvalid = true; // Endereço não encontrado
      }
    }, () => {
      this.addressInvalid = true; // Erro na solicitação
    });
  }
}
