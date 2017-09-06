import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hideElement = false;
  hideButton = true;
  // Titre du site
  title = 'NEED PC';

  // Autocomplete
  autocomplete: { data: { [key: string]: string } };

  // Phrase de résumé
  recap = '';
  // Question de base form dynamique
  question = 'Quel utilisation faites-vous de votre PC portable ?';
  // Options de base form dynamique
  options = ['Naviguer sur internet', 'Traitement de texte', 'Jouer'];
  // Fonction update questions réponses
  nextOption(value) {
    if (value == 'Jouer') {
      this.question = 'Vous aimez jouer aux jeux du genre';
      this.options = ['Pineball', 'Minecraft', 'Assassin\'s Creed Origin'];
    }
    if (value == 'Assassin\'s Creed Origin') {
      this.question = 'Quel est votre budget ?';
      this.options = ['0€ à 400€', '400€ à 800€', '800€ à 1500€', '1500€ ou plus'];
    }
    if (value == '1500€ ou plus') {
      this.question = 'Quel taille d\'écran désirez-vous ?';
      this.options = ['11 pouces', '13 pouces', '15 pouces', '17 pouces'];
    }
    if (value == '17 pouces') {
      this.hideElement = true;
      this.hideButton = false;
      this.question = 'Résumé';
      this.recap = 'Vous êtes un gamer, vous aimez jouer à Assassin\'s Creed Origin, vous avez un budget de 1500€ ou plus et vous désirez un ordinateur portable doté d\'un écran 17 pouces';
    }
  }

  // Initialisation du autocomplete
  ngOnInit() {
    this.setAutocomplete();
  }

  // Set du autocomplete
  setAutocomplete() {
    this.autocomplete = {
      data: {
        'Lenovo Y900': 'assets/img/logo.png',
        'Macbook pro 2017': 'assets/img/logo.png',
        'Macbook pro 2015': 'assets/img/logo.png',
      },
    };
  }
}
