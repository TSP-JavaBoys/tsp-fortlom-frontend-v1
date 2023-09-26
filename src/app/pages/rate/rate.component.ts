import { Component, OnInit,Input } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate/rate.service';
import { Router, ActivatedRoute } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() idcomment!:number
  idactualuser!:number
  constructor(private rateservice:RateService,private route:ActivatedRoute,private snackBar: MatSnackBar) {

    this.rate={}as Rate;

  }
  value!:number;
  val!: number
  rate!:Rate
  ngOnInit(): void {
    let pad=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id2= pad;
    this.idactualuser=id2;


  }
  formatLabel(value: number):string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    this.val = value;
    return value.toString();
  }
  new_rate( aId: number){
    console.log('rate:' + aId)
    this.rate.review=aId;
    this.NewRate();


  }
  NewRate(){
    console.log("Entrando a funcion NewRate")


    this.rateservice.existbyartistoidandfanaticid(this.idcomment,this.idactualuser).subscribe((response:any)=>{
         console.log("entro")
      if(response==false){
        this.rateservice.create(this.idcomment,this.idactualuser,this.rate).subscribe((response: any) => {

          this.snackBar.open('Se ha calificado al artista', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end'
          });

        });
      }
      else{
             this.rateservice.getByartistIdandfanaticid(this.idcomment,this.idactualuser).subscribe((response:any)=>{
                       console.log(response.content[0])
                       console.log(this.rate.review)
                       this.rateservice.update(response.content[0].id,this.rate).subscribe((response:any)=>{
                         this.snackBar.open('Se ha calificado al artista', 'Close', {
                           duration: 3000,
                           verticalPosition: 'bottom',
                           horizontalPosition: 'end'
                         });
                             return(response)

                       })
             })
      }

    })

  }

}
