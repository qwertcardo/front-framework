import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../model/publication.model';
import { AuthServiceService } from './auth-service.service';
import { StorageServiceService } from './storage-service.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LikeServiceService {

  constructor(private http: HttpClient, private authService: AuthServiceService, private storageService: StorageServiceService) { }

  like(publication: Publication): Observable<any> {
    const user: User = this.storageService.getUser()!;
    const model: Publication = new Publication(publication.id, null, null, null, null, null, null, null, new User(user.id), null, null)

    return this.http.post(`${environment.GATEWAY_API}/${environment.PRODUCER_SERVICE_CONTEXT}/publish/like`, model);
  }

  dislike(publication: Publication): Observable<any> {
    const user: User = this.storageService.getUser()!;
    const model: Publication = new Publication(publication.id, null, null, null, null, null, null, null, new User(user.id), null, null)

    return this.http.delete(`${environment.GATEWAY_API}/${environment.PRODUCER_SERVICE_CONTEXT}/delete/like`, {body: model});
  }
}
