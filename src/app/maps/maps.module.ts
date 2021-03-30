import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
// Components
// Pages
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';
// Comp
import { MiniMapComponent } from './components/mini-map/mini-map.component';


@NgModule({
  declarations: [
    FullscreenComponent, 
    MarkersComponent, 
    ZoomRangeComponent, 
    PropertiesComponent, 
    MiniMapComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
