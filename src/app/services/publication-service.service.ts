import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../interfaces/page.interface';
import { Publication } from '../model/publication.model';
import { AuthServiceService } from './auth-service.service';
import { StorageServiceService } from './storage-service.service';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationServiceService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private storageService: StorageServiceService) { }

  findAllPageable(page?: number, size?: number, type?: string): Observable<Page<Publication>> {
    let params = '';

    if (page) {
      params += `page=${page}&`;
    }

    if (size) {
      params += `size=${size}&`;
    }

    if (type) {
      params += `type=${type}`;
    }

    return this.http.get<Page<Publication>>(`${environment.GATEWAY_API}/${environment.CONSUMER_SERVICE_CONTEXT}/publication/page?${params}`);
  }

  findById(id: number): Observable<Publication> {
    return this.http.get<Publication>(`${environment.GATEWAY_API}/${environment.CONSUMER_SERVICE_CONTEXT}/publication/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${environment.GATEWAY_API}/${environment.PRODUCER_SERVICE_CONTEXT}/delete/publication`, {body: new Publication(id)});
  }

  visualize(id: number): void {
    this.http.post(`${environment.GATEWAY_API}/${environment.PRODUCER_SERVICE_CONTEXT}/visualization`, new Publication(id))
    .subscribe((_) => console.log('Publication: ' + id + 'visualized!'));
  }

  likedByUser(publication: Publication): boolean {
    if (this.authService.isLogged()) {
      const loggedUser: User = this.storageService.getUser()!;
      if (publication.likes?.find(like => like.user?.id === loggedUser.id)) {
        return true;
      }
      return false;
    }
    return false;
  }
}
