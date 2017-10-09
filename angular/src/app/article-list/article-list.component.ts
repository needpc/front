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
  }

  ngOnInit() {
  }

}
