import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { myService } from '../data.service';

import * as filter from '../filter.json';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  filters: Object[];
  jsonFilter = (<any>filter);
  count: any;
  results: string[];
  SharedDatatest: Object[];
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
    this.http.get('https://127.0.0.1:4433/api/v1/search/computers/').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['data'];
      this.count = this.results.length;
      this.countComputers();
    });
  }

  constructor(private http: HttpClient, private _myService: myService) {
    this.getAllComputers();
    this.filters = this.jsonFilter;

    this.SharedDatatest = this._myService.getData();

    // Choix
    for (var i = 0; i < this.SharedDatatest.length; i++) {
      // Chaque groupe
      for (var j = 0; j < this.jsonFilter.length; j++) {
        
      }
    }
  }

  ngOnInit() {
  }
}
