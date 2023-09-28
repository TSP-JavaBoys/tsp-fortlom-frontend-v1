import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Forum } from 'src/app/models/forum';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { ArtistforumService } from 'src/app/services/artistforum/artistforum.service';

@Component({
  selector: 'app-artist-forum-create-component',
  templateUrl: './artist-forum-create-component.component.html',
  styleUrls: ['./artist-forum-create-component.component.css']
})
export class ArtistForumCreateComponentComponent implements OnInit {

  public createform!:FormGroup;
  Forum!:Forum
  isHidden=true
  idnumber!:number;
  dataSource !:MatTableDataSource<any>;
  constructor(private formBuilder:FormBuilder,private service:ArtistforumService,
    private route:ActivatedRoute,private cd:Router,private ArtistService:ArtistService,private ActivatedRoute:ActivatedRoute) {
this.Forum={}as Forum;
this.Forum.forumname;

this.dataSource = new MatTableDataSource<any>();
   }

   ngOnInit() {
    this.createform=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
     })

     this.idnumber=parseInt(this.route.snapshot.paramMap.get('id')!)
      console.log(this.idnumber)
      this.getartist();
  }

crearforo(){

//this.Forum.user.id=this.idnumber

this.AddForum(this.idnumber)
let pod=(this.route.snapshot.url[0].path);
if (pod=='HomeArtist'){
  this.cd.navigate(['/HomeArtist',this.idnumber])
}
else{
  this.cd.navigate(['/HomeFanatic',this.idnumber])
}


}
getartist(){
  this.ArtistService.checkartistid(this.idnumber).subscribe((response:any)=>{
            this.isHidden=response
  })
}

AddForum(id:number){


  this.service.create(this.Forum, id).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    alert("se creo su foro exitosamente")
  },err=>{
    alert("este foro ya existe")
  });

}
}
