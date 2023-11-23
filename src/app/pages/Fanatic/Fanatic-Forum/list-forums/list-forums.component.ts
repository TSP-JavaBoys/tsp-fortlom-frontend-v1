import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanaticForumUpdate} from "../../../../models/FanaticForumUpdate";
import {FanaticforumService} from "../../../../services/fanaticforum/fanaticforum.service";
import {TokenService} from "../../../../services/token/token.service";
import {FanaticService} from "../../../../services/fanatic/fanatic.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-list-forums',
  templateUrl: './list-forums.component.html',
  styleUrls: ['./list-forums.component.css']
})
export class ListForumsComponent implements OnInit{
  dataSource!: MatTableDataSource<any>;
  public editForm!: FormGroup;
  FanaticForumUpdate!: FanaticForumUpdate;

  constructor(private fanaticForumService: FanaticforumService, private TokenService: TokenService,
              private FanaticService: FanaticService, public dialogRef: MatDialogRef<ListForumsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource<any>();
    this.FanaticForumUpdate={} as FanaticForumUpdate
  }

  ngOnInit(): void {
    const username=this.TokenService.getUserName();
    this.FanaticService.getUserByfanaticname(username).subscribe((response: any)=>{
      this.fanaticForumService.getAllForumByFanaticId(response.id).subscribe((response:any)=>{
        this.dataSource.data=response.content
      })
    })
    this.editForm=this.formBuilder.group({
      forumname:['',[Validators.required]],
      forumdescription:["", [Validators.required]],
    })
  }

  update(id: number){
    this.fanaticForumService.update(id, this.FanaticForumUpdate).subscribe((response:any)=>{
      console.log(this.FanaticForumUpdate.forumname)
      console.log(this.FanaticForumUpdate.forumdescription)
      console.log(response)
      this.dialogRef.close();
    })
  }

  delete(id:number){
    this.fanaticForumService.delete(id).subscribe((response:any)=>{
      this.dialogRef.close();
    })
  }


}
