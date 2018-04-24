import {Http} from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { myService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  options = [];
  finalArray = [];
  SharedData: Object[];
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
      this.finalArray.splice(this.i, 1);
      if (this.jsonChoiceData[this.i] != undefined) {
        this.question = this.jsonChoiceData[this.i].question;
        this.options = this.jsonChoiceData[this.i].reponses;
        var obj = this.options;
        this.options = Object.keys(obj).map(function (key) { return obj[key]; });
        this.options.sort();
      }
    }
  }
  else {
    this.finalArray.push(value);
    this.i = this.i + 1;
    if (this.jsonChoiceData[this.i] != undefined) {
      this.question = this.jsonChoiceData[this.i].question;
      this.options = this.jsonChoiceData[this.i].reponses;
      var obj = this.options;
      this.options = Object.keys(obj).map(function (key) { return obj[key]; });
      this.options.sort();
    }
    else {
      this.hideElement = true;
      this.hideButton = false;
      this.question = "Résumé";
      this._myService.setData(this.finalArray);
      this.recap = "Vous avez un budget allant de "+this.finalArray[0].toLowerCase()+", vous désirez un ordinateur portable doté d'un écran "+this.finalArray[1]+" et vous vous servez de votre ordinateur pour "+this.finalArray[2]+".";
    }
  }
}

// Initialise les options par défaut
initOptions() {
// this.http.get('https://127.0.0.1:4433/api/v1/ask').subscribe(data => {
//   // Read the result field from the JSON response.
//   this.jsonChoiceData = data['data'];
//   console.log(this.jsonChoiceData);
//   this.options = this.jsonChoiceData[this.i].reponses;
//   var obj = this.options;
//   this.options = Object.keys(obj).map(function (key) { return obj[key]; });
//   this.options.sort();
//   // Question de base form dynamique
//   this.question = this.jsonChoiceData[0].question;
// });
}

constructor(private http: HttpClient, private _myService: myService) {
}

// Initialisation du autocomplete
ngOnInit() {
this.initOptions();
}
}
