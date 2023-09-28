import { DatePipe } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Forumcomment } from 'src/app/models/forumcomment';
import { CommentService } from 'src/app/services/comment/comment.service';
import { ForumcommentService } from 'src/app/services/forumcomment/forumcomment.service';

@Component({
  selector: 'app-forumaddcomment',
  templateUrl: './forumaddcomment.component.html',
  styleUrls: ['./forumaddcomment.component.css'],
  providers: [DatePipe]
})
export class ForumaddcommentComponent implements OnInit{
  newcommentform!:FormGroup
  Forumcomment!:Forumcomment
  date!:Date
  constructor(private formBuilder:FormBuilder,public dialogRef: MatDialogRef<ForumaddcommentComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public datepipe: DatePipe,private servecommen:ForumcommentService){
    this.Forumcomment = {} as Forumcomment
  }
  ngOnInit() {
    this.newcommentform=this.formBuilder.group({

      comment:['',Validators.required]
    
    
    
    
    })
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
    this.NewForumComment(this.data.idactualuser,this.data.id)
  
    
    
    
    }

}
