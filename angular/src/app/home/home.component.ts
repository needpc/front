import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'NEED PC';

  autocomplete: { data: { [key: string]: string } };

  ngOnInit() {
    this.setAutocomplete();
  }

  setAutocomplete() {
    this.autocomplete = {
      data: {
        'Lenovo Y900': 'assets/img/logo.png',
        'Macbook pro 2017': 'assets/img/logo.png',
        'Macbook pro 2015': 'assets/img/logo.png',
      },
    };
  }
}
