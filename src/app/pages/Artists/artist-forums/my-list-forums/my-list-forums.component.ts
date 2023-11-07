import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArtistForumUpdate} from "../../../../models/ArtistForumUpdate";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ArtistforumService} from "../../../../services/artistforum/artistforum.service";
import {TokenService} from "../../../../services/token/token.service";
import {ArtistService} from "../../../../services/artist/artist.service";


@Component({
  selector: 'app-my-list-forums',
  templateUrl: './my-list-forums.component.html',
  styleUrls: ['./my-list-forums.component.css']
})
export class MyListForumsComponent implements OnInit{

  dataSource!: MatTableDataSource<any>;
  public editForm!:FormGroup;
  ArtistForumUpdate!:ArtistForumUpdate;

  constructor(private ArtistforumService:ArtistforumService,private TokenService:TokenService,private ArtistService:ArtistService,  public dialogRef: MatDialogRef<MyListForumsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder){
    this.dataSource = new MatTableDataSource<any>();
    this.ArtistForumUpdate= {} as ArtistForumUpdate

  }

  ngOnInit(): void {
    const username=this.TokenService.getUserName();
    this.ArtistService.getUserByartistname(username).subscribe((response:any)=>{
      this.ArtistforumService.getAllForumByArtistId(response.id).subscribe((response:any)=>{
        this.dataSource.data=response.content

      })

    })
    this.editForm=this.formBuilder.group({
      forumname:['',[Validators.required]],
      forumdescription:['',[Validators.required]],
    })

  }

  update(id:number){
    this.ArtistforumService.update(id,this.ArtistForumUpdate).subscribe((response:any)=>{
      console.log(this.ArtistForumUpdate.forumname)
      console.log(this.ArtistForumUpdate.forumdescription)
      console.log(response)
      this.dialogRef.close();

    })
  }

  delete(id:number){
    this.ArtistforumService.delete(id).subscribe((response:any)=>{
      this.dialogRef.close();
    })
  }



}
