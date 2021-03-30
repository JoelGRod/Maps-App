import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface BaseMarker {
  marker: mapboxgl.Marker;
  color: string;
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
    .map-container {
      width: 100%;
      height: 100%;
    }

    .add-button {
      cursor: pointer;
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 5rem;
      z-index: 1;
    }
    `
  ]
})
export class MarkersComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') map_container!: ElementRef;
  map!: mapboxgl.Map;
  zoom_value: number = 15;
  center: [number, number] = [-16.255817753566934, 28.467701536382535];
  // Markers
  markers: BaseMarker[] = [];
  
  constructor() { }

  // Clean listeners (rule of thumb)
  ngOnDestroy(): void {
    this.map.off('zoomend', () => {});
  }
  
  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.map_container.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoom_value
    });

    // Custom marker example:

    // 1 Example create html element with ts
    // const htmlElement: HTMLElement = document.createElement('div');
    // htmlElement.innerHTML = 'Hello World';
    
    // 2 Example create a marker with custom html element
    // new mapboxgl.Marker({
    //   element: htmlElement
    // })
    // .setLngLat(this.center)
    // .addTo(this.map);

    // Listener (zoom limitation)
    this.map.on('zoomend', (obj) => {
      if(this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });
  }

  add_marker(): void {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: color
    })
      .setLngLat(this.center)
      .addTo(this.map);
    
    
    this.markers.push({
      marker: newMarker,
      color: color
    });
  }

  go_marker(marker: mapboxgl.Marker): void {
    this.map.flyTo({
      center: marker.getLngLat()
    });
  }

  // Optimal: save in backend but for this 
  // example we put markers on local storage
  save_markers_local_storage(): void {

  }

  read_local_storage(): void {
    
  }

}
