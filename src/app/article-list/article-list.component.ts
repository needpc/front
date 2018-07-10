import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  count: any;
  results: string[];
  noImg = "https://www.dia.org/sites/default/files/No_Img_Avail.jpg";
  activity: any;

  jsonChoiceData: any;
  OptionQ1: any;
  OptionR1: any;
  OptionQ2: any;
  OptionR2: any;
  OptionQ3: any;
  OptionR3: any;
  OptionQ4: any;
  OptionR4: any;

  cookie1 = this.cookieService.get('cookie1');
  cookie2 = this.cookieService.get('cookie2');
  cookie3 = this.cookieService.get('cookie3');
  cookie4 = this.cookieService.get('cookie4');

  initOptions() {
    this.http.get(this.globals.urlRequest+'ask').subscribe(
      data => {
        this.jsonChoiceData = data['data'];

        this.OptionQ1 = this.jsonChoiceData[1].quest;
        this.OptionR1 = this.jsonChoiceData[1].responses;

        this.OptionQ2 = this.jsonChoiceData[2].quest;
        this.OptionR2 = this.jsonChoiceData[2].responses;

        this.OptionQ3 = this.jsonChoiceData[3].quest;
        this.OptionR3 = this.jsonChoiceData[3].responses;

        this.OptionQ4 = this.jsonChoiceData[4].quest;
        this.OptionR4 = this.jsonChoiceData[4].responses;
      });
    }

    countComputers() {
      if (this.count == 1) {
        this.count = this.count + ' résultat correspond à vos critères :';
      }
      else if (this.count > 1) {
        this.count = this.count + ' résultats correspondent à vos critères :';
      }
      else if (this.count == 0) {
        this.count = 'Aucun résultat ne correspond à vos critères.';
      }
    }

    getAllComputers() {
      this.http.get(this.globals.urlRequest+'search/computers?activity='+this.cookieService.get('cookie0')+'&cpuscore='+this.cookieService.get('cookie1')+'&screensize='+this.cookieService.get('cookie2')+'&gpuscore='+this.cookieService.get('cookie3')+'&pricing='+this.cookieService.get('cookie4')).subscribe(
        data => {
          this.results = data['data'];
          this.count = this.results.length;
          this.countComputers();
        });
      }

      updateList(value, n) {
        this.cookieService.set('cookie'+n, value);
        this.getAllComputers();
      }

      constructor(private http: HttpClient, private cookieService: CookieService, private globals: Globals) {}

      async ngOnInit() {
        this.initOptions();
        this.getAllComputers();
      }
    }
