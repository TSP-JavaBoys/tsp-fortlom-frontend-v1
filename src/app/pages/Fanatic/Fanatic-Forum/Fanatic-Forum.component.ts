import { MatTableDataSource } from '@angular/material/table';
import { FanaticforumService } from './../../../services/fanaticforum/fanaticforum.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Forum } from 'src/app/models/forum';

@Component({
  selector: 'app-Fanatic-Forum',
  templateUrl: './Fanatic-Forum.component.html',
  styleUrls: ['./Fanatic-Forum.component.css']
})
export class FanaticForumComponent implements OnInit {
  dataSource !:MatTableDataSource<any>;
  id!:number
  constructor(private FanaticforumService:FanaticforumService,private Router:Router,private ActivatedRoute:ActivatedRoute) {
    this.dataSource = new MatTableDataSource<any>();
  }
  ngOnInit(): void {
    this.id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!);
    this.getAll()
  }
  getAll(){
    this.FanaticforumService.getAll().subscribe((response:any)=>{
      this.dataSource.data=response.content

    })
  }
  goTOCreate(){
    this.Router.navigate(['HomeFanatic',this.id,'FanaticForum','CreateForum'],{queryParams:{id:this.id}})

  }
  gotoForumPage(item:Forum){
         const forum = JSON.stringify(item);
         this.Router.navigate(['HomeFanatic',this.id,'FanaticForum','ForumPage'],{queryParams:{forum:forum}})

  }

  updateForum(forumId: any) {

  }

  deleteForum(forumId: number) {

  }
}
