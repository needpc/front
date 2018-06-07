import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  objectKeys = Object.keys;
  objOption = {};
  i = 0;
  jsonChoiceData: any;
  hideElement = false;
  hideButton = true;

  // Titre du site
  title = 'NEED PC';

  // Phrase de résumé
  recap = '';

  question: any;

  // Fonction update questions réponses
  nextOption(value, param) {
    if (param == 'previous') {
      if (this.i > 0) {
        this.i = this.i - 1;
        this.cookieService.set('cookie'+this.i, value);
        if (this.jsonChoiceData[this.i] != undefined) {
          this.question = this.jsonChoiceData[this.i].question;
          this.objOption = {};

          for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
            this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
          }

          // Question de base form dynamique
          this.question = this.jsonChoiceData[this.i].quest;
        }
      }
    }
    else {
      this.cookieService.set('cookie'+this.i, value);
      this.i = this.i + 1;
      if (this.jsonChoiceData[this.i] != undefined) {
        this.question = this.jsonChoiceData[this.i].question;
        this.objOption = {};

        for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
          this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
        }

        // Question de base form dynamique
        this.question = this.jsonChoiceData[this.i].quest;
      }

      else {
        this.hideElement = true;
        this.hideButton = false;
        this.question = "Résumé";
        this.recap = "Cliquez sur le bouton pour lancer la recherche associée à vos critères.";
        // this.recap = "Vous avez un budget entre "+this.finalArray[4].toLowerCase()+", vous désirez un ordinateur portable doté d'un écran de "+this.finalArray[2]+" et vous vous servez de votre ordinateur pour "+this.finalArray[0].toLowerCase()+".";
      }
    }
  }

  // Initialise les options par défaut
  initOptions() {
    this.http.get('http://127.0.0.1:81/api/v1/ask').subscribe(data => {
      // Read the result field from the JSON response.
      this.jsonChoiceData = data['data'];
      this.objOption = {};

      for (var z = 0; z < this.jsonChoiceData[this.i].responses.length; z++) {
        this.objOption[this.jsonChoiceData[this.i].responses[z].resp] = this.jsonChoiceData[this.i].responses[z].indice;
      }

      // Question de base form dynamique
      this.question = this.jsonChoiceData[this.i].quest;
    });
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  // Initialisation du autocomplete
  ngOnInit() {
    this.cookieService.deleteAll();
    this.initOptions();
  }
}
