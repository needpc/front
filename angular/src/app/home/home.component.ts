import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import * as choiceData from '../choice.json';
import { myService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  choices: Object[];
  options = [];
  finalArray = [];
  SharedData: Object[];
  i = 0;
  jsonChoiceData = (<any>choiceData);

  hideElement = false;
  hideButton = true;
  // Titre du site
  title = 'NEED PC';

  // Phrase de résumé
  recap = '';
  // Question de base form dynamique
  question = this.jsonChoiceData[0].question;

  // Fonction update questions réponses
  nextOption(value, param) {
  if (param == 'previous') {
    if (this.i > 0) {
      this.i = this.i - 1;
      this.finalArray.splice(this.i, 1);
      if (this.jsonChoiceData[this.i] != undefined) {
        this.question = this.jsonChoiceData[this.i].question;
        this.options = this.jsonChoiceData[this.i].response;
        var obj = this.options;
        this.options = Object.keys(obj).map(function (key) { return obj[key]; });
      }
    }
  }
  else {
    this.finalArray.push(value);
    this.i = this.i + 1;
    if (this.jsonChoiceData[this.i] != undefined) {
      this.question = this.jsonChoiceData[this.i].question;
      this.options = this.jsonChoiceData[this.i].response;
      var obj = this.options;
      this.options = Object.keys(obj).map(function (key) { return obj[key]; });
      console.log(this.finalArray);
    }
    else {
      this.hideElement = true;
      this.hideButton = false;
      this.question = "Résumé";
      this._myService.setData(this.finalArray);
      this.recap = "Vous vous servez de votre ordinateur pour "+this.finalArray[0].toLowerCase()+", vous aimez jouer à "+this.finalArray[1]+", vous avez un budget de "+this.finalArray[2]+" et vous désirez un ordinateur portable doté d'un écran "+this.finalArray[3]+".";
    }
  }
}

// Initialise les options par défaut
initOptions() {
this.options = this.jsonChoiceData[this.i].response;
var obj = this.options;
this.options = Object.keys(obj).map(function (key) { return obj[key]; });
}

constructor(private _myService: myService) {
  console.log(this._myService.getData());
}

// Initialisation du autocomplete
ngOnInit() {
this.initOptions();
}
}
