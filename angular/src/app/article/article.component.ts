import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}

$(document).ready(function(){
  $('.carousel').carousel();
  $('.carousel').height($('.card-image').width());
});
$(window).resize(function(){
  $('.carousel').height($('.card-image').width());
});
