import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import * as data from '../computer.json';
import * as choiceData from '../choice.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  computers: Object[];
  choices: Object[];
  options = [];
  finalArray = [];
  i = 0;
  jsondata = (<any>data);
  jsonChoiceData = (<any>choiceData);
  count = this.jsondata.length;

  hideElement = false;
  hideButton = true;
  // Titre du site
  title = 'NEED PC';

  // Phrase de résumé
  recap = '';
  // Question de base form dynamique
  question = this.jsonChoiceData[0].question;

  // Fonction update questions réponses
  nextOption(value) {
    this.finalArray.push(value);
    console.log(this.finalArray);
    this.i = this.i + 1;
    if (this.jsonChoiceData[this.i] != undefined) {
      this.options = this.jsonChoiceData[this.i].response;
      var obj = this.options;
      this.options = Object.keys(obj).map(function (key) { return obj[key]; });
    }
    else {
      this.hideElement = true;
      this.hideButton = false;
      this.question = "Résumé";
      this.recap = "Vous vous servez de votre ordinateur pour "+this.finalArray[0]+", vous aimez jouer à "+this.finalArray[1]+", vous avez un budget de "+this.finalArray[2]+" et vous désirez un ordinateur portable doté d'un écran "+this.finalArray[3]+".";
    }
  }

  // Initialise les options par défaut
  initOptions() {
    this.options = this.jsonChoiceData[this.i].response;
    var obj = this.options;
    this.options = Object.keys(obj).map(function (key) { return obj[key]; });
  }

  constructor() {
  }

  // Initialisation du autocomplete
  ngOnInit() {
    this.initOptions();
  }
}
