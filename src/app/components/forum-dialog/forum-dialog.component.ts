import { LikeServiceService } from './../../services/like-service.service';
import { Publication } from 'src/app/model/publication.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicationServiceService } from 'src/app/services/publication-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forum-dialog',
  templateUrl: './forum-dialog.component.html',
  styleUrls: ['./forum-dialog.component.css']
})
export class ForumDialogComponent implements OnInit {
  
  text = '';
  liked = false;
  publication: Publication | null = null;

  constructor(public dialogRef: MatDialogRef<ForumDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Publication, private likeService: LikeServiceService, private publicationService: PublicationServiceService, private storageService: StorageServiceService) { 
    this.publication = data;
  }

  ngOnInit(): void {
  }

  reload(): void {
    this.publicationService.findById(this.data.id!).subscribe(
      (response: Publication) => {
        this.publication = response;
      }
    );
  }

  publish(): void {
    const commentary: Publication = new Publication(
      null,
      null,
      this.text,
      new Date(),
      'COMMENT',
      [],
      [],
      [],
      this.storageService.getUser(),
      new Publication(this.data.id),
      null
    );

    this.publicationService.comment(commentary).subscribe(
      (response) => {
        this.reload();
        this.text = '';
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  delete(publication: Publication): void {
    this.publicationService.deleteComment(publication.id!).subscribe(
      (response) => {
        this.reload();
      },
      (error: HttpErrorResponse) => {

      }
    );
  }

  like(publication: Publication): void {
    this.likeService.like(publication).subscribe((_) => {
      setTimeout(() => {
        this.reload();
      }, 200);
    });
  }

  dislike(publication: Publication): void {
    this.likeService.dislike(publication).subscribe((_) => {
     setTimeout(() => {
      this.reload();
     }, 200);
    });
  }

  publicationOwner(publication: Publication): boolean {
    if (publication.creator?.id === this.storageService.getUser()?.id) {
      return true;
    } else {
      return false;
    }
  }

  likedByUser(publication: Publication): boolean {
    return this.publicationService.likedByUser(publication);
  }

  formatDate(date: Date | null): string {
    if (date) {
      return new Date(date).toLocaleString('pt-br');
    } else {
      return '';
    }
  }

  disclosure(): void {
    this.dialogRef.close();
  }
}
