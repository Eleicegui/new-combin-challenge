import {Injectable} from '@angular/core';
import {HttpClient,HttpEvent,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class AuthService {

  constructor(
    public _http: HttpClient,
    ) 
    {}

    Authorizate(username:string = 'sarah', password:string = 'connor'): Promise<any>{
        let payload = new HttpParams().append('username',username).append('password',password);
        return this._http.post('http://localhost:8081/auth ',payload).toPromise();
    }
}
