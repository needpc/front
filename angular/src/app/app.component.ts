import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Autocomplete
  autocomplete: { data: { [key: string]: string } };

  // Initialisation du autocomplete
  ngOnInit() {
    this.setAutocomplete();
  }

  // Set du autocomplete
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
