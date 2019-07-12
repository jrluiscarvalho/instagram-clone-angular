import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html'
})
export class AccessComponent implements OnInit {
  public register: boolean = false

  constructor() { }

  ngOnInit() {
  }

  public showPanel(event: string) : void {
    this.register = event === 'register' ? true : false
  }

}
