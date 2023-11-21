import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ArtistEventComponent} from "../ArtistEvent.component";
import {EventService} from "../../../../services/event/event.service";
import {Event} from "../../../../models/event";


@Component({
  selector: 'app-artist-event-edit-mode',
  templateUrl: './artist-event-edit-mode.component.html',
  styleUrls: ['./artist-event-edit-mode.component.css']
})
export class ArtistEventEditModeComponent implements OnInit{
  eventdata!: Event;
  dataSource!: MatTableDataSource<any>;
  public editForm!:FormGroup;
  ArtistEventUpdate!:ArtistEventComponent;

  constructor(private ArtistEventService:EventService, public dialogRef: MatDialogRef<ArtistEventEditModeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder){
    this.dataSource = new MatTableDataSource<any>();
    this.ArtistEventUpdate= {} as ArtistEventComponent
    this.eventdata = {} as Event
  }
  ngOnInit() {
    const eventId = this.data.eventId
    this.loadEventData(eventId)
  }
  loadEventData(eventId: number) {
    this.ArtistEventService.getById(eventId).subscribe(
      (response: any) => {
        this.eventdata = response;
      },
      (error: any) => {
        console.error("Error al cargar la información del evento", error);
      }
    );
  }
  Cancel(): void {
    this.dialogRef.close();
  }

  Save() {
    this.ArtistEventService.updateEvent(this.eventdata.id, this.eventdata).subscribe(
      (response: any) => {
        console.log("Evento actualizado con éxito", response);
        this.Cancel()


      },
      (error: any) => {
        console.error("Error al actualizar el evento", error);
      }
    );
  }

}
