import { Component, OnInit, Input } from '@angular/core';
import { CryptoCompareService } from '../crypto-compare.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {

  @Input() currency : string;

  constructor(private cryptoservice : CryptoCompareService) { this.currency = 'ETH'}
  
  hourBefore = 3;
  ngOnInit() {
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
    this.getPriceBetweenInterval(Math.floor(new Date(Date.now() - (1000*60*60*hour) ).getTime()/1000 ) , Math.floor(Date.now()/1000 ))
  }


  private getPriceBetweenInterval(from: number, to: number){
    this.cryptoservice.getPriceBetweenInterval(this.currency, from, to)
    .subscribe(
      res => {
        
        this.lineChartData = [];
        this.lineChartLabels= [];
        let tmpLabels = [];
        let tmpArray : Array<number>= [];

        for(let obj of res['results'][0]['Data']){
          tmpArray.push(obj['close']);
          tmpLabels.push(this.tsToDate(obj['time']));
        }

        setTimeout(() =>{          
        this.lineChartLabels= tmpLabels;
        this.lineChartData.push({data: tmpArray, label: this.currency})
    }, 0);

      },
      err => {
        console.log("getPriceBetweenInterval "+err)
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

    if(from > to)
      this.getPriceBetweenInterval(to, from);
    else
      this.getPriceBetweenInterval(from, to);
  }
  
  public lineChartLabels:Array<any> = [];

  public lineChartData:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    // title: {
    //   text: "Courbe du prix de "+ this.currency + " en USD au cours des x hours " ,
    //   display: true
    // }
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
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
