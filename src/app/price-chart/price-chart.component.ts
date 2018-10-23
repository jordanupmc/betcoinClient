import { Component, OnInit, Input } from '@angular/core';
import { CryptoCompareService } from '../crypto-compare.service';
import { CurrencyIndex } from '@angular/common/src/i18n/locale_data';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  @Input() currency : string;

  constructor(private cryptoservice : CryptoCompareService) { this.currency = 'BTC'}
  
  ngOnInit() {
    this.fillChart(3);
  }
  

  public tsToDate(ts){
    return new Date(ts * 1000);
  }
  
  public fillChart(hour : number){
    this.lineChartData = [];
    this.lineChartLabels=[];
    let today = new Date();
    this.cryptoservice.getPriceBetweenInterval(this.currency, Math.floor(new Date(Date.now() - (1000*60*60*hour) ).getTime() /1000) , Math.floor(Date.now() /1000))
    .subscribe(
      res => {
        let tmpArray : Array<number>= [];
        for(let obj of res['results'][0]['Data']){
          tmpArray.push(obj['close']);
          this.lineChartLabels.push(this.tsToDate(obj['time']));
        }
        this.lineChartData.push({data: tmpArray, label: this.currency})
        
      }
    );
  }
  
  public lineChartLabels:Array<any> = [];

  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
