import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
      width: 21rem;
      z-index: 1;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') map_container!: ElementRef;
  map!: mapboxgl.Map;
  zoom_value: number = 10;
  center: [number, number] = [-16.255817753566934, 28.467701536382535];

  constructor() { }

  // Clean listeners (rule of thumb)
  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.map_container.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoom_value
    });

    // Listener (zoom value - class property updater)
    this.map.on('zoom', (obj) => this.zoom_value = this.map.getZoom());
    // Listener (zoom limitation)
    this.map.on('zoomend', (obj) => {
      if(this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });
    // Listener (coords value - class property updater)
    this.map.on('move', (event) => {
      // const target = event.target;
      // const {lng, lat} = target.getCenter();
      // this.center = [lng, lat];
      const {lng, lat} = this.map.getCenter();
      this.center = [lng, lat];
    });
    
  }

  zoom_in(): void {
    this.map.zoomIn();
  }

  zoom_out(): void {
    this.map.zoomOut();
  }

  zoom_range(value: string): void {
    this.map.zoomTo(Number(value));
  }

}
