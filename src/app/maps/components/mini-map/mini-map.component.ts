import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    .map-container {
      width: 100%;
      height: 10rem;
      margin: 0px;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {
  
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('map') map_container!: ElementRef;

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.map_container.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(map);
  }

  

}
