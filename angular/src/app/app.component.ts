import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Autocomplete
  autocomplete: { data: { [key: string]: string }, limit: number };
  computerList: any;
  results: any;
  array: any;
  myJson: any;

  constructor(private http: HttpClient) {
  }

  getComputerList() {
    this.http.get('http://127.0.0.1/api/v1/search/computers/').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['data'];
      this.computerList = {};
      for (var i = 0; i < this.results.length; i++) {
        var objModel = this.results[i].model;
        var objPic = this.results[i].picture;
        this.computerList[objModel] = objPic;
      }
      this.setAutocomplete();
    });
  }

  ngOnInit() {
    this.getComputerList();
  }

  // Set du autocomplete
  setAutocomplete() {
  this.autocomplete = {
    data: this.computerList, limit: 5
  };
}
}
