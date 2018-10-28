import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'betcoinclient';
  iconURL = './assets/img/arrow_icon.png'

  moveSide() {
    const divSidebar = document.getElementById('sidebar');
    const imgArrow = document.getElementById('arrow_img');
    if ( divSidebar.style.left === '0px' ) {
      divSidebar.style.left = '-200px';
      imgArrow.style.transform = 'rotate(0deg)';
      imgArrow.style.webkitTransform = 'rotate(0deg)';
    } else {
      divSidebar.style.left = '0px';
      imgArrow.style.transform = 'rotate(180deg)';
      imgArrow.style.webkitTransform = 'rotate(180deg)';
    }
  }
}
