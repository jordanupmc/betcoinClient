import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'betcoinclient';

  moveSide() {
    const divSidebar = document.getElementById('sidebar');
    if ( divSidebar.style.left === '0px' ) {
      divSidebar.style.left = '-200px';
    } else {
      divSidebar.style.left = '0px';
    }
  }
}
