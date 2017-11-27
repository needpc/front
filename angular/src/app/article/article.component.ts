import { Component, OnInit } from '@angular/core';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
// import * as data from '../computer.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  computers: Object[];
  // jsondata = (<any>data);

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   for (var i = 0; this.jsondata.length; i++) {
    //     if (this.jsondata[i].id == params['id']) {
    //         this.computers = this.jsondata[i];
    //         break;
    //     }
    //   }
    // });
  }

  public imageSources: string[] = [
    'http://media.ldlc.com/ld/products/00/04/20/04/LD0004200464_2.jpg',
    'http://media.ldlc.com/ld/products/00/04/13/97/LD0004139737_2_0004187178_0004329357.jpg',
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
