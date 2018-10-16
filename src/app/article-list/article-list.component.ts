import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  results: any;
  noImg = "assets/img/No_Img_Avail.jpg";
  activity: any;
  pricing: any;
  selectedValueTri: any;

  // Filtres
  jsonChoiceData: any;
  OptionQ1: any;
  OptionR1: any;
  OptionQ2: any;
  OptionR2: any;
  OptionQ3: any;
  OptionR3: any;
  OptionQ4: any;
  OptionR4: any;

  // Liste des cookies
  cookie1 = this.cookieService.get('cookie1');
  cookie2 = this.cookieService.get('cookie2');
  cookie3 = this.cookieService.get('cookie3');
  cookie4 = this.cookieService.get('cookie4');

  // Initialise les filtres
  initOptions(rank, id) {
    this.http.get(this.globals.urlRequest+'ask?rank='+rank+'&'+this.cookieService.get('cookie0')+'&activity=1').subscribe(
      data => {
        this.jsonChoiceData = data['data'];

        if (this.jsonChoiceData != "") {
          if (id == 1) {
            this.OptionQ1 = this.jsonChoiceData[0].quest;
            this.OptionR1 = this.jsonChoiceData[0].responses;
          }
          if (id == 2) {
            this.OptionQ2 = this.jsonChoiceData[0].quest;
            this.OptionR2 = this.jsonChoiceData[0].responses;
          }
          if (id == 3) {
            this.OptionQ3 = this.jsonChoiceData[0].quest;
            this.OptionR3 = this.jsonChoiceData[0].responses;
          }
          if (id == 4) {
            this.OptionQ4 = this.jsonChoiceData[0].quest;
            this.OptionR4 = this.jsonChoiceData[0].responses;
          }
        }
      });
    }

    // Compte le nombre de résultats
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

    // Récupère tous les ordinateurs
    getAllComputers() {
    this.http.get(this.globals.urlRequest+'search/computers?'+this.cookieService.get('cookie1')+'&'+this.cookieService.get('cookie2')+'&'+this.cookieService.get('cookie3')+'&'+this.cookieService.get('cookie4')).subscribe(
      // this.http.get(this.globals.urlRequest+'search/computers?'+this.cookieService.get('cookie0')+'&'+this.cookieService.get('cookie1')+'&'+this.cookieService.get('cookie2')+'&'+this.cookieService.get('cookie3')+'&'+this.cookieService.get('cookie4')).subscribe(
        data => {
          this.results = data['data'];
          this.count = this.results.length;
          this.countComputers();

          this.updateTri(this.selectedValueTri);
        });
      }

      ascPriceSort(myArray) {
        myArray.sort( function(name1, name2) {
          if ( name1.prices[0].last_price < name2.prices[0].last_price ) {
            return -1;
          } else if ( name1.prices[0].last_price > name2.prices[0].last_price ) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      descPriceSort(myArray) {
        myArray.sort( function(name1, name2) {
          if ( name1.prices[0].last_price > name2.prices[0].last_price ) {
            return -1;
          } else if ( name1.prices[0].last_price < name2.prices[0].last_price ) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      ascBrandSort(myArray) {
        myArray.sort( function(name1, name2) {
          if ( name1.model < name2.model ) {
            return -1;
          } else if ( name1.model > name2.model ) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      descBrandSort(myArray) {
        myArray.sort( function(name1, name2) {
          if ( name1.model > name2.model ) {
            return -1;
          } else if ( name1.model < name2.model ) {
            return 1;
          } else {
            return 0;
          }
        });
      }

      updateList(value, n) {
        this.cookieService.set('cookie'+n, value);
        this.getAllComputers();
      }

      updateTri(value) {
        if (value == "ascPrice") {
          this.ascPriceSort(this.results);
        }
        if (value == "descPrice") {
          this.descPriceSort(this.results);
        }
        if (value == "ascBrand") {
          this.ascBrandSort(this.results);
        }
        if (value == "descBrand") {
          this.descBrandSort(this.results);
        }
      }

      constructor(private http: HttpClient, private cookieService: CookieService, private globals: Globals) {}

      async ngOnInit() {
        this.selectedValueTri = "ascPrice";
        this.initOptions(2, 1);
        this.initOptions(3, 2);
        this.initOptions(4, 3);
        this.initOptions(5, 4);
        this.getAllComputers();
      }
    }
