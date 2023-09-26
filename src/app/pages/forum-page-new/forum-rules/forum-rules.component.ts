import { FanaticforumService } from 'src/app/services/fanaticforum/fanaticforum.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumRules } from 'src/app/models/ForumRules';

@Component({
  selector: 'app-forum-rules',
  templateUrl: './forum-rules.component.html',
  styleUrls: ['./forum-rules.component.css']
})
export class ForumRulesComponent implements OnInit {
  rules!:FormGroup
  forumrules!:string
  ForumRules!:ForumRules
  rulestext!:string
  constructor(private formBuilder:FormBuilder,private FanaticforumService:FanaticforumService,public dialogRef: MatDialogRef<ForumRulesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.ForumRules= {} as ForumRules
   }

  ngOnInit() {
    this.rules=this.formBuilder.group({

      setrules:['',Validators.required]
  
  
   })
   this.rulestext=this.checkrules()
  }
  checkrules(){
    if(this.data.rules==null){
      return 'No hay reglas por favor ingreselas'
    }else{
      return this.data.rules
    }
  }
  createrules(){
    console.log('rules')
    this.FanaticforumService.update(this.data.id,this.ForumRules)
    .subscribe((response:any)=>{
      this.rulestext=response.forumrules;
      this.dialogRef.close( this.rulestext)

    })
  }
  Limpiar2(){
    this.rules.reset();
  }
}
