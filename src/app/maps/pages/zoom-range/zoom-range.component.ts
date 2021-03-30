import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .map-container {
      width: 100%;
      height: 100%;
    }

    .zoom-container {
      background-color: white;
      border-radius: 5px;
      padding: 0.5rem;
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') map_container!: ElementRef;
  map!: mapboxgl.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.map_container.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-16.255817753566934, 28.467701536382535],
      zoom: 17
    });
  }

  zoom_in() {
    this.map.zoomIn();
  }

  zoom_out() {
    this.map.zoomOut();
  }

}
