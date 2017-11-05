import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  @ViewChild('toggleButton') toggleButton:ElementRef;
  
  menuCollapsed: Boolean = true;

  constructor() { }

  ngOnInit() {
  }


  toggleNav() {
    this.menuCollapsed = this.menuCollapsed ? false : true;
    console.log("menuCollapsed", this.menuCollapsed);
  }


  collapseNav() {
    this.toggleButton.nativeElement.click();
  }

}
