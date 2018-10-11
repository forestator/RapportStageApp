import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<DialogueComponent>) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close();
  }
}
