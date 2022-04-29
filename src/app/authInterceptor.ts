import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';


@Injectable({
    providedIn: "root"
})

export class authInterceptor implements HttpInterceptor {
    private auth_token: string;
    constructor (
        private _authService: AuthService,
    ){}
        
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth_token = sessionStorage.getItem('auth_token');
        if(!this.auth_token && !req.url.includes("/auth")){
            this._authService.Authorizate().then(
                (resolve) => {
                    this.auth_token = resolve;
                    sessionStorage.setItem('auth_token',resolve.token);
                },
                (error) => {
                    console.log("Something went wrong with the authorization process");
                }
            )
        }
        
        const headers = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.auth_token}`)
        });

        return next.handle(headers).pipe(
            catchError (err => {
                return throwError(err);
            })
        );
    }

}
