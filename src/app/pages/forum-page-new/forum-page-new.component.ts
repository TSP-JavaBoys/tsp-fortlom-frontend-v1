import { TokenService } from 'src/app/services/token/token.service';
import { PersonService } from 'src/app/services/person/person.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForumRulesComponent } from './forum-rules/forum-rules.component';
import { Forum } from 'src/app/models/forum';
import { DialogreportforumComponent } from '../ForumPage/dialogreportforum/dialogreportforum.component';
import { Report } from 'src/app/models/report';
import { ReportService } from 'src/app/services/report/report.service';
import { ForumaddcommentComponent } from './forumaddcomment/forumaddcomment.component';


@Component({
  selector: 'app-forum-page-new',
  templateUrl: './forum-page-new.component.html',
  styleUrls: ['./forum-page-new.component.css']
})
export class ForumPageNewComponent implements OnInit{
  isHidden=true
  forum!:Forum
  reportdescriptiondialog!:string;
  report!:Report
  idactualuser!:number
  constructor(public dialog:MatDialog,private ActivatedRoute:ActivatedRoute,private  ReportService:ReportService,private PersonService:PersonService,private TokenService:TokenService) {
    this.forum= {} as Forum
    this.report={}as Report
   }

  ngOnInit() {
    this.getidUser(this.TokenService.getUserName())
    this.ActivatedRoute.queryParams.subscribe((params: Params)=>{
      const data=params['forum']
      const userData = JSON.parse(data);
      this.forum=userData
      console.log(this.forum)
     
 })
  }
  opencreate(){
    const dialogRef = this.dialog.open(ForumaddcommentComponent, {
      width: '700px',
      data: {idactualuser: this.idactualuser,id:this.forum.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      
     
    });

  }
  openTRules(): void {
    const dialogRef = this.dialog.open(ForumRulesComponent, {
      width: '700px',
      data: {rules: this.forum.forumrules,id:this.forum.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.forum.forumrules=result
     
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
 
  getidUser(id:string){
    this.PersonService.getByusername(id).subscribe((response:any)=>{

      this.idactualuser=response.id;
      

    });


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



}
