import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Autocomplete
  autocomplete: { data: { [key: string]: string } };
  computers: any;
  results: any;
  array: any;
  // Initialisation du autocomplete

  constructor(private http: HttpClient) {
  }

  getComputerList() {
    this.http.get('https://127.0.0.1:4433/api/v1/search/computers/').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['data'];
    });
  }

  ngOnInit() {
    this.getComputerList();
    this.computers = {'Aurore Ci5P-8-S5': 'https://media.ldlc.com/ld/products/00/04/45/56/LD0004455603_2.jpg'};
    this.setAutocomplete();
  }

  // Set du autocomplete
  setAutocomplete() {
  this.autocomplete = {
    data: this.computers,
  };
}
}
