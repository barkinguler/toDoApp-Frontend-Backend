import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ipaddress} from '../components/shared/IpAdress';
import {AuthRequestData, ImodelResponse} from '../Imodel/Iresponse';
import {ModelServiceService} from './model-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  logIn(value: AuthRequestData) {
    ModelServiceService.requestConditionforInterceptor = false;
    return this.http
      .post<ImodelResponse>(ipaddress.value + '/login', value)
      .pipe(
        catchError((error) => {
          this.user.next(false);
          throw new error(error);
        }),
        tap((resData) => {
          localStorage.setItem('token', resData.token);
          localStorage.setItem('id', resData.id.toLocaleString());
          localStorage.setItem('username', resData.username);
          localStorage.setItem('password', resData.password);
          this.user.next(true);
        })
      );
  }
}
