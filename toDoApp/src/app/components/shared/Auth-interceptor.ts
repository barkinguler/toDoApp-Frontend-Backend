import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { ModelServiceService } from 'src/app/Service/model-service.service';



@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      
    const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          
 // 'Access-Control-Allow-Origin': '*',
 // 'Access-Control-Allow-Methods':'DELETE, PUT, POST, GET, OPTIONS',
 // 'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
          'Authorization': localStorage.getItem("token")
         
         
        })
      });
      const authReq1 = req.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          
  //'Access-Control-Allow-Origin': '*',
  //'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
 // 'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
         // 'Authorization': localStorage.getItem("token")
         
         
        })
      });
      if(ModelServiceService.requestConditionforInterceptor===true)
      return next.handle(authReq);
      else
      return next.handle(authReq1);
  }
}