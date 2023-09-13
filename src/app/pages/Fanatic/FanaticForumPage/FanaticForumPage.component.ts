import { DialogreportforumComponent } from './../../ForumPage/dialogreportforum/dialogreportforum.component';
import { ReportService } from './../../../services/report/report.service';
import { TokenService } from 'src/app/services/token/token.service';
import { Fanatic } from './../../../models/fanatic';
import { Params, ActivatedRoute } from '@angular/router';
import { FanaticforumService } from './../../../services/fanaticforum/fanaticforum.service';
import { Component, OnInit } from '@angular/core';
import { Forum } from 'src/app/models/forum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumRules } from 'src/app/models/ForumRules';
import { Forumcomment } from 'src/app/models/forumcomment';
import { DatePipe } from '@angular/common'
import { ForumcommentService } from 'src/app/services/forumcomment/forumcomment.service';
import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { PersonService } from 'src/app/services/person/person.service';
import { Report } from 'src/app/models/report';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-FanaticForumPage',
  templateUrl: './FanaticForumPage.component.html',
  styleUrls: ['./FanaticForumPage.component.css'],
  providers: [DatePipe]
})
export class FanaticForumPageComponent implements OnInit {
  forum!:Forum
  rules!:FormGroup
  forumrules!:string
  ForumRules!:ForumRules
  newcommentform!:FormGroup
  Forumcomment!:Forumcomment
  hidden=false
  date!:Date
  reportdescriptiondialog!:string;
  idactualuser!:number
  report!:Report
  constructor(private FanaticforumService:FanaticforumService,
    public datepipe: DatePipe,private ActivatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,private servecommen:ForumcommentService,
    private Fanatic:PersonService,private TokenService:TokenService,
    private ReportService:ReportService,public dialog:MatDialog) { 
    this.forum= {} as Forum
    this.ForumRules={}as ForumRules
    this.Forumcomment={}as Forumcomment
    this.report={}as Report
  }

  ngOnInit() {
this.getid()
    this.ActivatedRoute.queryParams.subscribe((params: Params)=>{
       const data=params['forum']
       const userData = JSON.parse(data);
       this.forum=userData
       console.log(this.forum)
      
  })
  this.rules=this.formBuilder.group({

    setrules:['',Validators.required]


 })
 this.newcommentform=this.formBuilder.group({

  comment:['',Validators.required]




})
  }
  getid(){
    this.Fanatic.getByusername(this.TokenService.getUserName()).subscribe((response:any)=>{
      this.idactualuser=response.id
    })
  }




  change(){
    if(this.hidden==true){
      this.hidden=false
    }else{
      this.hidden=true
    }
  }
  checkrules(){
    if(this.forum.forumrules==null){
      return 'No hay reglas por favor ingreselas'
    }else{
      return this.forum.forumrules
    }
  }
  createrules(){
    this.FanaticforumService.update(this.forum.id,this.ForumRules)
    .subscribe((response:any)=>{
             this.forum.forumrules=response.forumrules;

    })
  }
  Limpiar2(){
    this.rules.reset();
  }
  Limpiar(){

    this.newcommentform.reset();
    
    
    
    }
    NewForumComment(userid:number,forumid:number){

      this.servecommen.create(this.Forumcomment,userid,forumid).subscribe((response: any) => {
        
        alert("se agrego un comentario")
  
      },err=>{
        alert("ponga un comentario")
      });
  
  
    }
  
    crearcomentariodeforo(){
      this.date=new Date();
    //this.Forumcomment.user=this.idactualus let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd')!;
    this.Forumcomment.registerdate=this.date
    
   console.log(this.Forumcomment)
    this.NewForumComment(this.idactualuser,this.forum.id)
  
    
    
    
    }
    flagPost(id:number,descriptiondialog:string) {
      console.log(descriptiondialog)
      this.report.description=descriptiondialog
      this.ReportService.createforforum(this.report,this.idactualuser,id,this.forum.id)
        .subscribe((response: any) => {
          alert("reporte enviado")
          console.log(response);
        });
    }
    openDialog(id:number){
      console.log(id);
      const dialogRef = this.dialog.open(DialogreportforumComponent, {
        width: '500px',
        data: {reportdescriptiondialog: this.reportdescriptiondialog},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.reportdescriptiondialog = result;
        console.log(this.reportdescriptiondialog);
        if(this.reportdescriptiondialog != null){
          this.flagPost(id,this.reportdescriptiondialog);
        }
      });
    }
  
}
