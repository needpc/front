import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  public imageSources: string[] = [
     'http://media.ldlc.com/ld/products/00/04/20/04/LD0004200464_2.jpg',
     'http://media.ldlc.com/ld/products/00/04/55/55/LD0004555550_2.jpg',
     'http://media.ldlc.com/ld/products/00/04/13/97/LD0004139737_2_0004187178_0004329357.jpg'
  ];

  public config: ICarouselConfig = {
    verifyBeforeLoad: true,
    log: false,
    animation: true,
    animationType: AnimationConfig.SLIDE,
    autoplay: true,
    autoplayDelay: 5000,
    stopAutoplayMinWidth: 768
  };
}
