import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PublicationServiceService } from 'src/app/services/publication-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { Publication } from 'src/app/model/publication.model';
import { Router } from '@angular/router';
import { PhotoFile } from 'src/app/model/photo-file.model';

@Component({
  selector: 'app-publication-dialog',
  templateUrl: './publication-dialog.component.html',
  styleUrls: ['./publication-dialog.component.css']
})
export class PublicationDialogComponent implements OnInit {
  title = '';
  content = '';
  files: File[] = [];

  constructor(public dialogRef: MatDialogRef<PublicationDialogComponent>, private publicationService: PublicationServiceService, private storageService: StorageServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onFileChange(event: any): void {
    for (var i = 0; i < event.target.files.length; i++) { 
      const fileName: string = event.target.files[i].name;
      if (fileName.match('\.(gif|jpeg|jpg|png|bmp)$')?.length) {
        this.files.push(event.target.files[i]);
      }
    }
  }

  async publish(): Promise<void> {
    const toBase64 = (file: any) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const photoFiles: PhotoFile[] = [];
    for (let file of this.files) {
      const content64 = (await toBase64(file) as string).split(',')[1];
      const photoFile = new PhotoFile(null, file.name, content64, null, null);
      photoFiles.push(photoFile);
    }

    const user = this.storageService.getUser();
    const publication = new Publication(null, this.title, this.content, new Date(), 'PUBLICATION', photoFiles, [], [], user, null);

    this.publicationService.publish(publication).subscribe(
        (response) => {
          this.publicationService.reloadSubject.next();
          this.dialogRef.close();
        },
        (error: HttpErrorResponse) => {

        }
    );

  }

  cancel(): void {
    this.dialogRef.close();
  }
}
