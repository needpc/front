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
  chart = [];
  chart2 = [];
  chart3 = [];
  expertMode = true;
  simpleMode = false;
  textMode = "Mode expert";

  gaugeType = "full";
  gaugeGraphicVal = 43;
  gaugeProcVal = 56;
  gaugeRAMVal = 67;
  gaugeGraphic = "Carte graphique";
  gaugeProc = "Processeur";
  gaugeRAM = "RAM";
  gaugeAppendText = "%";
  foregroundColorGraphic="#009D92";
  foregroundColorProc="#FFA700";
  foregroundColorRAM="#1144AA";
  capRound="round";

  constructor(private http: HttpClient, private route: ActivatedRoute, private globals: Globals) {
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

  getAll() {
    this.computer = [];
    this.route.params.subscribe(params => {
      this.http.get(this.globals.urlRequest+'search/computers/'+params['id']).subscribe(data => {
        this.computer = data['data'][0];
      });
    });
  }

  ngOnInit() {
    setTimeout(function(){ $('#simpleMode').height($('#simpleMode').children().height()); }, 100);

    this.getAll();
  }
}
