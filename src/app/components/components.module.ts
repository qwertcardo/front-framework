import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumDialogComponent } from './forum-dialog/forum-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicationDialogComponent } from './publication-dialog/publication-dialog.component';
import { GaleryDialogComponent } from './galery-dialog/galery-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ForumDialogComponent,
    PublicationDialogComponent,
    GaleryDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgbModule
  ]
})
export class ComponentsModule { }
