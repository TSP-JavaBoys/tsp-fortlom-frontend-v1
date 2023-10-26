import { UpdateDescription } from './../../../../models/UpdateDescription';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { TokenService } from './../../../../services/token/token.service';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { Component,OnInit,Inject } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit{

  dataSource!: MatTableDataSource<any>;
  public editform!:FormGroup;
  UpdateDescription!:UpdateDescription
constructor(private PublicationService:PublicationService,private TokenService:TokenService,private ArtistService:ArtistService,  public dialogRef: MatDialogRef<MypostsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder){
  this.dataSource = new MatTableDataSource<any>();
  this.UpdateDescription= {} as UpdateDescription

}

ngOnInit(): void {
const username=this.TokenService.getUserName();
this.ArtistService.getUserByartistname(username).subscribe((response:any)=>{
  this.PublicationService.getAllPublicationByArtistId(response.id).subscribe((response:any)=>{
    this.dataSource.data=response.content

  })

})
this.editform=this.formBuilder.group({
  description:['',[Validators.required]],
 })



}

update(id:number){
  this.PublicationService.update(id,this.UpdateDescription).subscribe((response:any)=>{
    console.log(this.UpdateDescription.description)
    console.log(response)
    this.dialogRef.close();

  })
}











delete(id:number){
  this.PublicationService.delete(id).subscribe((response:any)=>{
        this.dialogRef.close();
  })
}



















}
