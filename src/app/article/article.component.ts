import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Globals } from '../globals';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  computer: any;
  pricing: any;
  expertMode = true;
  simpleMode = false;
  textMode = "Mode expert";

  // Variables gauge
  gaugeType = "full";
  gaugeGraphicVal: number = 0;
  gaugeProcVal: number = 0;
  gaugeGraphic = "Carte graphique";
  gaugeProc = "Processeur";

  // Variables chartjs
  canvas: any;
  ctx: any;
  labelChart = [];
  dataChart = [];
  datasetChart = [];
  myChart: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private globals: Globals) {}

  // Options du modal
  public modalOptions: Materialize.ModalOptions = {
  dismissible: false,
  opacity: .5,
  inDuration: 300,
  outDuration: 200,
  startingTop: '100%',
  endingTop: '10%',
  ready: (modal, trigger) => {
    this.initChart();
  }
};

// Initialise chartsjs historique des prix
initChart() {
this.canvas = document.getElementById('histoChart');
this.ctx = this.canvas.getContext('2d');
this.myChart = new Chart(this.ctx, {
  type: 'bar',
  data: {
    labels: this.labelChart,
    datasets: this.datasetChart
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    responsive: false,
    display: true
  }
});
}

// Change entre les modes expert et simplifié
toggleMode(event) {
if (this.textMode == "Mode expert") {
  this.expertMode = false;
  this.simpleMode = true;
  this.textMode = " Mode simplifié";
  $('#simpleMode').height($('#simpleMode div:nth-child(1)').height() + $('#simpleMode div:nth-child(2)').height());
}
else {
  this.expertMode = true;
  this.simpleMode = false;
  this.textMode = "Mode expert";
}
}

// Liste les informations du pc et récupère les scores du processeur ainsi que la carte graphique
getPC() {
this.computer = [];
this.route.params.subscribe(params => {
  this.http.get(this.globals.urlRequest+'search/computers/'+params['id']).subscribe(data => {
    this.computer = data['data'][0];
    this.gaugeGraphicVal = this.computer.gpu.score * 10;
    this.gaugeProcVal = Number(((this.computer.cpu.score / 35000) * 100).toFixed(1)) * 100;

    this.pricing = [];
    this.pricing = data['data'][0].prices;
    this.labelChart = [];
    this.dataChart = [];
    this.datasetChart = [];
    var result: any;
    var resultData: any;
    var resultTraders: any;

    for (var z = 0; z < this.pricing.length; z++) {
      result = Object.keys(this.pricing[z].pricing);
      resultData = Object.values(this.pricing[z].pricing);
      resultTraders = this.pricing[z].computers_trader;

      for (var i = 0; i < result.length; i++) {
        this.labelChart.push(result[i].split('T')[0]);
      }

      for (var i = 0; i < resultData.length; i++) {
        this.dataChart.push(resultData[i]);
      }

      this.datasetChart.push({
        label: resultTraders.name,
        data: this.dataChart,
        backgroundColor: this.getRandomColor(),
        borderWidth: 1
      });
    }
  });
});
}

// Génère des couleurs aléatoires pour l'historique des prix
getRandomColor() {
var letters = '0123456789ABCDEF';
var color = '#';
for (var i = 0; i < 6; i++) {
  color += letters[Math.floor(Math.random() * 16)];
}
return color;
}
// Récupère l'historique des prix
getPrice() {
this.pricing = [];
this.route.params.subscribe(params => {
  this.http.get(this.globals.urlRequest+'search/price/'+params['id']).subscribe(data => {
    this.pricing = data['data'];
    this.labelChart = [];
    this.dataChart = [];
    this.datasetChart = [];
    var result: any;
    var resultData: any;
    var resultTraders: any;

    for (var z = 0; z < this.pricing.length; z++) {
      result = Object.keys(this.pricing[z].pricing);
      resultData = Object.values(this.pricing[z].pricing);
      resultTraders = this.pricing[z].computers_trader;

      for (var i = 0; i < result.length; i++) {
        this.labelChart.push(result[i].split('T')[0]);
      }

      for (var i = 0; i < resultData.length; i++) {
        this.dataChart.push(resultData[i]);
      }

      this.datasetChart.push({
        label: resultTraders.name,
        data: this.dataChart,
        backgroundColor: this.getRandomColor(),
        borderWidth: 1
      });
    }
  });
});
}

// Permet de changer la taille de la div contenant les graphiques
ngAfterViewInit() {
$(window).resize(function() {
  if ($(window).width() < 993) {
    $('#simpleMode').height($('#simpleMode div:nth-child(2)').height() + $('#simpleMode div:nth-child(1)').height() + $('#simpleMode div:nth-child(3)').height());
  }
  else {
    $('#simpleMode').height($('#simpleMode div:nth-child(2)').height() + $('#simpleMode div:nth-child(1)').height());
  }
});

$(document).ready(function() {
  if ($(window).width() < 993) {
    $('#simpleMode').height($('#simpleMode div:nth-child(2)').height() + $('#simpleMode div:nth-child(1)').height() + $('#simpleMode div:nth-child(3)').height());
  }
  else {
    $('#simpleMode').height($('#simpleMode div:nth-child(2)').height() + $('#simpleMode div:nth-child(1)').height());
  }
});
}

semicircle: boolean = false;
getOverlayStyle() {
  let isSemi = this.semicircle;
  let transform = (isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)';

  return {
    'top': isSemi ? 'auto' : '50%',
    'bottom': isSemi ? '5%' : 'auto',
    'left': '50%',
    'transform': transform,
    '-moz-transform': transform,
    '-webkit-transform': transform,
    'font-size': 125 / 3.5 + 'px'
  };
}

// Initialise les fonctions de récupération
ngOnInit() {
this.getPC();
}
}
