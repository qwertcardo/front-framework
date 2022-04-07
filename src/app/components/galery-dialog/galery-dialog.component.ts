import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Publication } from 'src/app/model/publication.model';

@Component({
  selector: 'app-galery-dialog',
  templateUrl: './galery-dialog.component.html',
  styleUrls: ['./galery-dialog.component.css']
})
export class GaleryDialogComponent implements OnInit {

  images: any[] = [];

  constructor(public dialogRef: MatDialogRef<GaleryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Publication) {
    console.log(data)

    this.data.files?.forEach(file => {
      this.images.push(`data:image/${file.fileName?.split('.').pop()};base64,${file.content64}`);
    });
  }

  ngOnInit(): void {
  }

  return(): void {
    this.dialogRef.close();
  }
}
