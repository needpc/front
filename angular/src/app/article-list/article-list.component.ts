import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { myService } from '../data.service';

import * as filter from '../filter.json';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  filters: Object[];
  jsonFilter = (<any>filter);
  count: any;
  preResults: any;
  results: string[];
  SharedDatatest: Object[];
  filter1: any;
  noImg = "https://www.dia.org/sites/default/files/No_Img_Avail.jpg";

  countComputers() {
    if (this.count == 1) {
      this.count = this.count + ' résultat correspond à vos critères :';
    }
    else if (this.count > 1) {
      this.count = this.count + ' résultats correspondent à vos critères :';
    }
    else if (this.count == 0) {
      this.count = 'Aucun résultat pour vos critères.';
    }
  }

  getAllComputers() {
    this.http.get('http://127.0.0.1/api/v1/search/computers?activity=1').subscribe(data => {
    // this.http.get('http://127.0.0.1/api/v1/search/computers?activity='+SharedDatatest[0]).subscribe(data => {
      // Read the result field from the JSON response.
      this.preResults = data['data'];
      // this.results = [];
      this.results = data['data'];

      this.count = this.results.length;
      this.countComputers();
    });
  }

  constructor(private http: HttpClient, private _myService: myService) {
  }

  async ngOnInit() {
    this.SharedDatatest = await this._myService.getData();
    this.filters = this.jsonFilter;
    this.getAllComputers();
  }
}
