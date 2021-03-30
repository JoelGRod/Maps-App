import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fullscreen',
        component: FullscreenComponent
      },
      {
        path: 'markers',
        component: MarkersComponent
      },
      {
        path: 'properties',
        component: PropertiesComponent
      },
      {
        path: 'zoom-range',
        component: ZoomRangeComponent
      },
      {
        path: '**',
        redirectTo: 'fullscreen'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MapsRoutingModule { }
