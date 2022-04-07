import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from './services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { StorageServiceService } from './services/storage-service.service';
import { PublicationDialogComponent } from './components/publication-dialog/publication-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-framework';
  user: User = new User();
  isLogged = false;

  constructor(private authService: AuthServiceService, private storageService: StorageServiceService, private router: Router, private matDialog: MatDialog) {
    this.authService.observeAuthChanges().subscribe(
      (authenticated) => {
        this.isLogged = authenticated;

        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      }
    );

    this.authService.observeUserChanges().subscribe(
      (user) => {
        this.user = user;
      }
    );
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.user = this.storageService.getUser()!;
      this.isLogged = true;
    }
  }

  create(): void {
    this.matDialog.open(PublicationDialogComponent, {
      height: '80%',
      width: '80%',
      minWidth: '260px'
    })
    .afterClosed().subscribe(
      (publication) => {
        
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
