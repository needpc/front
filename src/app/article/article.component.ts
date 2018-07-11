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

  gaugeType = "full";
  gaugeGraphicVal = 0;
  gaugeProcVal = 0;
  gaugeRAMVal = 0;
  gaugeGraphic = "Carte graphique";
  gaugeProc = "Processeur";
  gaugeRAM = "RAM";
  gaugeAppendText = "%";
  foregroundColorGraphic="#009D92";
  foregroundColorProc="#FFA700";
  foregroundColorRAM="#1144AA";
  capRound="round";

  canvas: any;
  ctx: any;
  labelChart = [];
  dataChart = [];
  datasetChart = [];
  myChart: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private globals: Globals) {}

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
    this.initChart();
  }
};

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

toggleMode(event) {
  if (this.textMode == "Mode expert") {
    this.expertMode = false;
    this.simpleMode = true;
    this.textMode = " Mode simplifié";
    $('#simpleMode').height($('#simpleMode').children().height());
  }
  else {
    this.expertMode = true;
    this.simpleMode = false;
    this.textMode = "Mode expert";
  }
}

getPC() {
  this.computer = [];
  this.route.params.subscribe(params => {
    this.http.get(this.globals.urlRequest+'search/computers/'+params['id']).subscribe(data => {
      this.computer = data['data'][0];
      this.gaugeGraphicVal = this.computer.gpu.score;
    });
  });
}

getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

ngAfterViewInit() {
  setTimeout(function(){ $('#simpleMode').height($('#simpleMode').children().height()); }, 100);
}

ngOnInit() {
  this.getPC();
  this.getPrice();
}
}
