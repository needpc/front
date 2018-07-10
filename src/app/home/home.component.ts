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
  e = 1;
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
  changeOption(value, param) {
  if (param == 'previous') {
    if (this.e > 0) {
      this.e = this.e - 1;
      this.cookieService.set('cookie'+(this.e - 1), value);
      this.initOptSpec(this.e);
    }
  }
  else {
    this.cookieService.set('cookie'+(this.e - 1), value);
    this.e = this.e + 1;
    this.initOptSpec(this.e);
  }
}

// Initialise les options par défaut
initOptions() {
this.initOptSpec(1);
}

initOptSpec(id) {
  this.http.get(this.globals.urlRequest+'ask?rank='+id).subscribe(
    data => {
      if (this.cookieService.get('cookie0') == "2") {
        console.log("Gamer");
      }
      else if (this.cookieService.get('cookie0') == "3") {
        console.log("Bureautique");
      }
      else if (this.cookieService.get('cookie0') == "4") {
        console.log("Multimédia");
      }
      // Read the result field from the JSON response.
      this.jsonChoiceData = data['data'];
      this.objOption = {};

      if (this.jsonChoiceData[this.i] != undefined) {
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
