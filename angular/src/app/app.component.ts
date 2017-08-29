import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NEED PC';

  autocomplete: { data: { [key: string]: string } };

  ngOnInit() {
    this.setAutocomplete();
  }

  setAutocomplete() {
    this.autocomplete = {
      data: {
        'Lenovo X50': 'assets/img/logo.png',
        'Macbook pro 2017': 'assets/img/logo.png',
        'Macbook pro 2015': 'assets/img/logo.png',
      },
    };
  }
}
