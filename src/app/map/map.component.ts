import { Component, Input } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMap, MapMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
@Input() location: any;
@Input() center: any;

}
