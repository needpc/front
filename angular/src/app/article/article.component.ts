import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICarouselConfig, AnimationConfig } from 'angular4-carousel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  computers: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  getAll() {
    this.http.get('https://127.0.0.1:4433/api/v1/computers/3').subscribe(data => {
      // Read the result field from the JSON response.
      this.computers = data['data'][0];
    });
  }

  async ngOnInit() {
    await this.getAll();
    // this.route.params.subscribe(params => {
    //   for (var i = 0; this.computers.length; i++) {
    //     if (this.computers[i].id == params['id']) {
    //       this.computers = this.computers[i];
    //       break;
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
