import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormControl} from '@angular/forms'
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Forum } from 'src/app/models/forum';
import { MatTableDataSource } from '@angular/material/table';
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from "@angular/material/paginator";
import { ForumService } from 'src/app/services/forum/forum.service';
import {ArtistforumService} from "../../../services/artistforum/artistforum.service";
import {MypostsComponent} from "../../publication/post-list/myposts/myposts.component";
import {MyListForumsComponent} from "./my-list-forums/my-list-forums.component";
@Component({
  selector: 'app-artist-forums',
  templateUrl: './artist-forums.component.html',
  styleUrls: ['./artist-forums.component.css']
})
export class ArtistForumsComponent implements OnInit {
  forumdata !:Forum;
  forumdatabyid !:Forum;
  forums:Forum[]=[];
  dataSource !:MatTableDataSource<any>;
  @ViewChild('ForumForm', {static: false})
  ForumForm!: NgForm;
  displayedColumns: string[] = ['id', 'ForumName', 'ForumDescription','actions'];
  @ViewChild(MatSort) sort !:MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator !:MatPaginator;
  searchKey!:string;
  isEditMode = false;
  numerot:number=1
  form:FormGroup=new FormGroup({
    ForumName:new FormControl('',Validators.required),
    ForumDescription:new FormControl('',[Validators.required,Validators.maxLength(40)])
  });
  idnumber!:number;

  constructor( private service:ArtistforumService,private dialog:MatDialog,private cd:Router,private route:ActivatedRoute ) {
    this.forumdata = {} as Forum;
    this.dataSource = new MatTableDataSource<any>();
    this.forumdatabyid ={} as Forum;
  }
  ngOnInit(): void {
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;

    this.getAllStudents()
    console.log(this.forums);
    console.log(this.displayedColumns);
    console.log(this.isEditMode)
  }


  getAllStudents() {
    this.service.getAll(this.idnumber).subscribe((response: any) => {
      this.dataSource.data = response.content;
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;

      console.log( this.dataSource.data)
    });
  }

  OnSearchClear(){
    this.searchKey="";
    this.applyfilter();
  }

  cancelEdit() {
    this.isEditMode = false;
    this.ForumForm.resetForm();
  }

  applyfilter(){
    this.dataSource.filter=this.searchKey.trim().toLowerCase();
  }

  addStudent(id:number) {
    this.service.create(this.forumdata,id).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    });
  }

  insertforum(){
    this.cd.navigate(['/HomeArtist',this.idnumber,'ArtistForum','CreateForum'])
  }

  gotoForumPage(item:Forum){

    const forum = JSON.stringify(item);
    this.cd.navigate(['HomeArtist',this.idnumber,'ArtistForum','ForumPage'],{queryParams:{forum:forum}})
  }
  //HomeArtist/1/ArtistForum/ForumPage

  myForums(){
    const dialogRef = this.dialog.open(MyListForumsComponent, {
      width: '500px',
      data: {}
    });



  }


}
