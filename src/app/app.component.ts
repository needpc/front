import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  computerSearch = [];
  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = 'Vilnius';
  selectedCityId: number;
  selectedUserIds: number[];

  computerList: any;
  results: any;
  array: any;
  myJson: any;

  constructor(private http: HttpClient) {
  }

  getComputerList() {
    this.http.get('http://127.0.0.1:81/api/v1/search/computers/').subscribe(data => {
      // this.http.get('https://api.needpc.fr/v1/search/computers/').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['data'];
      this.computerSearch = this.results;
    });
  }

  ngOnInit() {
    this.getComputerList();
  }
}
