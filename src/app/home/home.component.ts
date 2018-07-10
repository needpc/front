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
  i = 0;
  e = 0;
  jsonChoiceData: any;
  hideElement = false;
  hideButton = true;
  // Titre du site
  title = 'NEED PC';
  // Phrase de résumé
  recap = '';
  question: any;
  valueResp: any;

  // Fonction update questions réponses
  nextOption(value, param) {
    if (param == 'previous') {
      if (this.i > 0) {
        this.i = this.i - 1;
        this.cookieService.set('cookie'+this.i, value);
        if (this.jsonChoiceData[this.i] != undefined) {
          this.objOption = {};

          // Question de base form dynamique
          this.question = this.jsonChoiceData[this.i].quest;

          for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
            this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
          }
        }
      }
    }
    else {
      this.cookieService.set('cookie'+this.i, value);
      this.i = this.i + 1;
      if (this.jsonChoiceData[this.i] != undefined) {
        this.objOption = {};

        // Question de base form dynamique
        this.question = this.jsonChoiceData[this.i].quest;

        for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
          this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
        }
      }

      else {
        this.hideElement = true;
        this.hideButton = false;
        this.question = "Résumé";
        this.recap = "Cliquez sur le bouton pour lancer la recherche associée à vos critères.";
      }
    }
  }

  // Initialise les options par défaut
  initOptions() {
    this.http.get(this.globals.urlRequest+'ask').subscribe(data => {
      // Read the result field from the JSON response.
      this.jsonChoiceData = data['data'];
      this.objOption = {};

      // Question de base form dynamique
      this.question = this.jsonChoiceData[this.i].quest;

      for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
        this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
      }
    });
  }

  initOptSpec() {
    this.http.get(this.globals.urlRequest+'ask?rank=2').subscribe(data => {
      if (this.cookieService.get('cookie'+this.i) == "2") {
        this.e = 0;
      }
      else if (this.cookieService.get('cookie'+this.i) == "3") {
        this.e = 1;
      }
      else if (this.cookieService.get('cookie'+this.i) == "4") {
        this.e = 2;
      }
      // Read the result field from the JSON response.
      this.jsonChoiceData = data['data'];
      this.objOption = {};

      // Question de base form dynamique
      this.question = this.jsonChoiceData[this.e].quest;

      for (var z = 0; z < this.jsonChoiceData[this.e].responses.length; z++) {
        this.objOption[this.jsonChoiceData[this.e].responses[z].resp] = this.jsonChoiceData[this.e].responses[z].indice;
      }
    });
  }

  constructor(private http: HttpClient, private cookieService: CookieService, private globals: Globals) {
  }

  // Initialisation du autocomplete
  ngOnInit() {
    this.cookieService.deleteAll();
    this.initOptions();
  }
}
