import { PublicationServiceService } from './../../services/publication-service.service';
import { Page } from './../../interfaces/page.interface';
import { Publication } from './../../model/publication.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  number = 0;
  length = 0;
  size = 10;
  page: Page<Publication> | null = null;

  constructor(private publicationService: PublicationServiceService, private router: Router) { }

  ngOnInit(): void {
    this.reload()

    this.publicationService.reloadSubject.subscribe(
      (_) => {
        this.reload();
      }
    );
  }

  reload(): void {
    const event: PageEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: 10,
      previousPageIndex: 0
    }

    this.pageEvent(event);
  }

  pageEvent(event: PageEvent): void {
    this.number = event.pageIndex;
    this.size = event.pageSize;

    this.publicationService.findAllPageable(this.number, this.size, 'PUBLICATION').subscribe(
      (response: Page<Publication>) => {
        this.page = response;
        this.length = response.totalElements;
      }
    );
  };

  details(publication: Publication): void {
    this.router.navigate(['/publication/' + publication.id])
  }

  shortPreviewArticle(publication: Publication): string {
    const thirdPart = publication.content?.length! / 3;
    return publication.content?.substring(0, thirdPart)!;
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
