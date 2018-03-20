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
    this.http.get('https://127.0.0.1:4433/api/v1/search/computers/').subscribe(data => {
      // Read the result field from the JSON response.
      this.preResults = data['data'];
      this.results = [];

      if (this.SharedDatatest[2] == 'Traiter du texte' || this.SharedDatatest[2] == 'Naviguer sur internet') {
        this.filter1 = 'bureautique';
      }
      else if (this.SharedDatatest[2] == 'Jouer') {
        this.filter1 = 'gaming';
      }

      for (var i = 0; i < this.preResults.length; i++) {
        if (this.preResults[i].display.size == String(this.SharedDatatest[1]).replace(/[^0-9]+/, '') && this.preResults[i].activity.name == this.filter1) {
          this.results.push(this.preResults[i]);
        }
      }
      this.count = this.results.length;
      this.countComputers();
      var array;
      for (var i = 0; i < this.SharedDatatest.length; i++) {
        array = this.SharedDatatest[i];
        $('.optgroup-option').each(function(index) {
          if($(this).text() == array) {
            $(this).click();
            $('.dropdown-content').click();
          }
        });
      }
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
