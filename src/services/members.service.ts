import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';


@Injectable()
export class MembersService {

  constructor(
    public _http: HttpClient,
    ) 
    {}

    getMembers(): Observable<any>{
         return this._http.get( 'http://localhost:8081/api/members');
    }

    //Load a CEA to a Contract
    setMember(new_member): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
        let payload = new HttpParams({fromObject: new_member});
        return this._http.post('http://localhost:8081/api/members',payload,{headers: headers});
    }
}
