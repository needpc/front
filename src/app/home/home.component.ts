import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  objectKeys = Object.keys;
  objOption = {};
  e = 1;
  jsonChoiceData: any;
  hideElement = false;
  hideButton = true;
  hideButtonBefore = true;
  title = 'NEED PC';
  recap = '';
  question: any;
  valueResp: any;

  // Fonction update questions réponses
  changeOption(value, param) {
  if (param == 'previous') {
    if (this.e == 2) {
      this.hideButtonBefore = true;
    }
    if (this.e > 0) {
      this.e = this.e - 1;
      if (this.e == 1) {
        this.cookieService.set('cookie'+(this.e - 1), "");
        this.initOptSpec(this.e, this.cookieService.get('cookie0'));
      }
      else if (this.e > 1) {
        this.cookieService.set('cookie'+(this.e - 1), value);
        this.initOptSpec(this.e, this.cookieService.get('cookie0'));
      }
      else {
        this.cookieService.set('cookie'+(this.e - 1), value);
        this.initOptSpec(this.e, this.cookieService.get('cookie0'));
      }
    }
  }
  else {
    this.hideButtonBefore = false;
    if (this.e > 1) {
      this.cookieService.set('cookie'+(this.e - 1), value);
      this.e = this.e + 1;
      this.initOptSpec(this.e, this.cookieService.get('cookie0'));
    }
    else {
      this.cookieService.set('cookie'+(this.e - 1), value);
      this.e = this.e + 1;
      this.initOptSpec(this.e, this.cookieService.get('cookie0'));
    }
  }
}

// Initialise les options par défaut
initOptions() {
this.initOptSpec(1, "");
}

// Set les questions réponses en fonction de l'activité et de la position
initOptSpec(id, activity) {
if (activity != "") {
  $('spinner').hide();
  this.http.get(this.globals.urlRequest+'ask?rank='+id+'&'+activity+"&activity=1").subscribe(
    data => {
      this.jsonChoiceData = data['data'];
      this.objOption = {};

      if (this.jsonChoiceData[0] != undefined) {
        // Question de base form dynamique
        this.question = this.jsonChoiceData[0].quest;

        for (var z = 0; z < this.jsonChoiceData[0].responses.length; z++) {
          this.objOption[this.jsonChoiceData[0].responses[z].resp] = this.jsonChoiceData[0].responses[z].indice;
        }
      }
      else {
        this.hideElement = true;
        this.hideButton = false;
        this.question = "Résumé";
        this.recap = "Cliquez sur le bouton pour lancer la recherche associée à vos critères.";
      }
    });
  }
  else {
    $('spinner').hide();
    this.http.get(this.globals.urlRequest+'ask?rank='+id).subscribe(
      data => {
        this.jsonChoiceData = data['data'];
        this.objOption = {};

        if (this.jsonChoiceData[0] != undefined) {
          // Question de base form dynamique
          this.question = this.jsonChoiceData[0].quest;

          for (var z = 0; z < this.jsonChoiceData[0].responses.length; z++) {
            this.objOption[this.jsonChoiceData[0].responses[z].resp] = this.jsonChoiceData[0].responses[z].indice;
          }
        }
        else {
          this.hideElement = true;
          this.hideButton = false;
          this.question = "Résumé";
          this.recap = "Cliquez sur le bouton pour lancer la recherche associée à vos critères.";
        }
      });
    }

  }

  constructor(private http: HttpClient, private cookieService: CookieService, private globals: Globals) {}

  ngOnInit() {
    this.cookieService.deleteAll();
    this.initOptions();
  }
}
