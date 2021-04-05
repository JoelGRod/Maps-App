import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface BaseMarker {
  marker: mapboxgl.Marker;
  color: string;
}

interface LocalBaseMarker {
  center: [number, number];
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
      text-align: center;
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: 6rem;
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
      zoom: 0
    });

    this.read_local_storage();

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

    newMarker.on('dragend', () => {
      this.save_markers_local_storage();
    });

    this.save_markers_local_storage();
  }

  go_marker(marker: mapboxgl.Marker): void {
    this.map.flyTo({
      center: marker.getLngLat(),
      zoom: this.zoom_value
    });
  }

  // Dbl click for delete
  delete_marker(index: any) {
    this.markers[index].marker?.remove();   // Remove object
    this.markers.splice(index, 1);          // Remove index
    this.save_markers_local_storage();      // Update local storage
  }

  // Optimal: save in backend but for this 
  // example we put markers on local storage
  save_markers_local_storage(): void {
    const local_markers: LocalBaseMarker[] = [];

    this.markers.forEach( marker => {
      const color = marker.color;
      const {lng, lat} = marker.marker.getLngLat();

      local_markers.push({
        center: [lng, lat],
        color: color
      })
    });

    localStorage.setItem('markers', JSON.stringify(local_markers));
  }

  read_local_storage(): void {
    if(!localStorage.getItem('markers')) return;

    const local_markers: LocalBaseMarker[] = JSON.parse(localStorage.getItem('markers')!);

    local_markers.forEach( marker => {
      const newMarker = new mapboxgl.Marker({
        draggable: true,
        color: marker.color
      })
        .setLngLat(marker.center)
        .addTo(this.map);
      
      
      this.markers.push({
        marker: newMarker,
        color: marker.color
      });

      newMarker.on('dragend', () => {
        this.save_markers_local_storage();
      });
    });
  }

}
