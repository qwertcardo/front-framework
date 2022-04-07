import { LikeServiceService } from './../../services/like-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Publication } from 'src/app/model/publication.model';
import { PublicationServiceService } from 'src/app/services/publication-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit {

  publication: Publication | null = null;
  liked = false;

  constructor(private route: ActivatedRoute, private router: Router, private publicationService: PublicationServiceService, private likeService: LikeServiceService, private storageService: StorageServiceService) {
    this.route.params.subscribe(
      (params: Params) => {
        this.publicationService.findById(params['id']).subscribe(
          (response: Publication) => {
            this.publication = response;
            this.liked = this.likedByUser(response);
            this.publicationService.visualize(response.id!);
          }
        );
      }
    )
  }

  ngOnInit(): void {
  }

  forum(publication: Publication): void {
    
  }

  delete(publication: Publication): void {
    this.publicationService.delete(publication.id!).subscribe((_) => this.router.navigate(['/main']));
  }

  like(publication: Publication): void {
    this.likeService.like(publication).subscribe((_) => {
      this.publicationService.findById(this.publication?.id!).subscribe(
        (response: Publication) => {
          this.publication = response;
          this.liked = this.likedByUser(response);
          this.publicationService.visualize(response.id!);
        }
      );
    });
  }

  dislike(publication: Publication): void {
    this.likeService.dislike(publication).subscribe((_) => {
      this.publicationService.findById(this.publication?.id!).subscribe(
        (response: Publication) => {
          this.publication = response;
          this.liked = this.likedByUser(response);
          this.publicationService.visualize(response.id!);
        }
      );
    });
  }

  plicationOwner(publication: Publication): boolean {
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
}
