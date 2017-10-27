import { Component, OnInit } from '@angular/core';
import * as data from '../computer.json';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  computers: Object[];
  jsondata = (<any>data);
  count = this.jsondata.length;

  constructor() {
    this.computers = this.jsondata;
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
