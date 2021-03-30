import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #map {
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      // Container id
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      // [long , lat]
      center: [ -16.25571984356082, 28.46766567332878 ],
      zoom: 17
    });
  }

}
