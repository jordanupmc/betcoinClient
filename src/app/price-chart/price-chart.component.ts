import { Component, OnInit, Input } from '@angular/core';
import { CryptoCompareService } from '../crypto-compare.service';
import { FormGroup, FormControl } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  @Input() currency : string;
  @Input() enableChangeInterval: boolean=true;
  @Input() enableSelectCurrency: boolean=true;

  constructor(private cryptoservice : CryptoCompareService, private routeur : Router) {
    this.currency = 'ETH'; 
    // this.enableChangeInterval=false;
    // this.enableSelectCurrency=false;
  }
  
  currencyList = [
     { val: "ETH", name: "Ethereum"},
  { val : "BTC", name: "Bitcoin"},
  { val : "ETC", name: "EthereumClassic"},
  { val : "LTC", name: "LiteCoin"},
  { val : "EOS", name:"EOS"},
  { val :"BCH", name:"BitcoinCash"},
  { val :"XRP", name:"XRP"},
  { val :"ZEC", name:"ZCash"},
  { val :"NEO", name:"NEO"},
  { val :"DASH", name:"Dash"}];

  hourBefore = 3;
  isLoading=true;
  msgErr="";

  ngOnInit() {
    this.fillChart(this.hourBefore);
  }
  
  public updateCurrency(value){
    this.currency=value;
    this.fillChart(this.hourBefore);
  }

  public tsToDate(ts){
    return new Date(ts * 1000);
  }
  
  intervalForm = new FormGroup({
    fromDate: new FormControl(''),
    fromTime: new FormControl(''),
    toDate: new FormControl(''),
    toTime: new FormControl('')
  });
  
  // hour before date now
  public fillChart(hour : number){
    this.lineChartData = [];
    this.lineChartLabels=[];
    this.setLineChartOptionsTitle("Courbe du prix de "+ this.currency + " en EUR au cours des "+ this.hourBefore+" dernières heures");

    this.getPriceBetweenInterval(Math.floor(new Date(Date.now() - (1000*60*60*hour) ).getTime()/1000 ) , Math.floor(Date.now()/1000 ))
  }

  private getPriceBetweenInterval(from: number, to: number){
    this.isLoading=true;
    this.cryptoservice.getPriceBetweenInterval(this.currency, from, to)
    .subscribe(
      res => {
        if(res["status"]=="KO"){
          this.msgErr = res["errorMessage"];
          this.isLoading=false;
          var redir = res['redictLogin'];
          if(redir){
            localStorage.clear();
            window.alert("You have been disconnected\n Please log in again");
            this.routeur.navigate(['login']);
          }
          return;
        }
        if(res['results'][0]['Response'] == "Error"){
          this.msgErr = res['results'][0]['Message']
          return;
        }
        this.msgErr="";
        this.isLoading=false;
        this.lineChartData = [];
        this.lineChartLabels= [];
        let tmpLabels = [];
        let tmpArray : Array<number>= [];

        for(let obj of res['results'][0]['Data']){
          tmpArray.push(obj['close']);
          tmpLabels.push(this.tsToDate(obj['time']));
        }

        // setTimeout(() =>{          
          this.lineChartLabels= tmpLabels;
          this.lineChartData.push({data: tmpArray, label: this.currency})
        // }, 0);

      },
      err => {
        this.isLoading=false;
        this.msgErr=err;
      }
    );
  }
  changeInterval(){
    let from = Math.floor((new Date (this.intervalForm.value.fromDate+" "+this.intervalForm.value.fromTime).getTime()) / 1000);
    let to = Math.floor((new Date (this.intervalForm.value.toDate+" "+this.intervalForm.value.toTime).getTime()) / 1000);
    let now = Math.floor(Date.now() /1000);
    if(to > now)
      to = now;
    if(from > now)
      from = now;

    if( from == to )
      from = Math.floor(new Date(Date.now() - (1000*60*60*this.hourBefore) ).getTime() /1000);
    
    this.setLineChartOptionsTitle("Courbe du prix de "+ this.currency + " en EUR entre "
    + this.intervalForm.value.fromDate+" "+this.intervalForm.value.fromTime
     +" et "+ this.intervalForm.value.toDate+" "+this.intervalForm.value.toTime);

    if(from > to)
      this.getPriceBetweenInterval(to, from);
    else
      this.getPriceBetweenInterval(from, to);
  }
  
  public lineChartLabels:Array<any> = [];

  public lineChartData:Array<any> = [];

  public setLineChartOptionsTitle(title){
    this.lineChartOptions = {
      responsive: true,
      scales:{
        xAxes: [{
          ticks: {
            display:false
          },
            display: false
        }]
      }
      ,title: {
        text: title ,
        display: true
      }
    };
  }
  public lineChartOptions:any;

  public lineChartColors:Array<any> = [

    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
