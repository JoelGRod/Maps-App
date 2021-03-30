import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent {

  menu_items: MenuItem[] = [
    {
      route: '/maps/fullscreen',
      name: 'Fullscreen'
    },
    {
      route: '/maps/markers',
      name: 'Markers'
    },
    {
      route: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/maps/properties',
      name: 'Properties'
    }
  ];

}
