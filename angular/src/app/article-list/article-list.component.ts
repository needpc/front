import { Component, OnInit } from '@angular/core';
import * as data from '../computer.json';
import * as filter from '../filter.json';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  computers: Object[];
  filters: Object[];
  jsonData = (<any>data);
  jsonFilter = (<any>filter);
  count = this.jsonData.length;

  constructor() {
    this.computers = this.jsonData;
    this.filters = this.jsonFilter;
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

  ngOnInit() {
  }

}
