import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  computerSearch = [];
  selectedArticleId: number;

  computerList: any;
  results: any;
  array: any;
  myJson: any;

  constructor(private http: HttpClient, private globals: Globals) {
  }

  getComputerList() {
    this.http.get(this.globals.urlRequest+'search/computers/').subscribe(data => {
    // Read the result field from the JSON response.
    this.results = data['data'];
    this.computerSearch = this.results;
  });
}

ngOnInit() {
  this.getComputerList();
}
}
