import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ImodelDate, ImodelWork} from '../Imodel/Imodel';
import {map, catchError} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';

import {ValueConverter} from '@angular/compiler/src/render3/view/template';
import {AuthRequestData} from '../Imodel/Iresponse';
import {ipaddress} from '../components/shared/IpAdress';
import {Irealtime} from '../Imodel/Irealtime';

@Injectable({
  providedIn: 'root',
})
export class ModelServiceService {
  static requestConditionforInterceptor: boolean;
  private items = [];
  private dates = [];
  private IstatisticArray = [];
  dateDetail = new Subject<ImodelDate>();
  newDateValue = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  onAddDate(event: ImodelDate) {
    event.auth = {
      id: parseInt(localStorage.getItem('id')),
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
    };
    this.http
      .post<ImodelDate>(ipaddress.value + '/post', event)
      .subscribe((responseData) => {
        this.newDateValue.next(event.datename);
      });
  }

  getDates() {
    ModelServiceService.requestConditionforInterceptor = true;
    const params = new HttpParams().append('id', localStorage.getItem('id'));
    const header = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('token')
    );
    this.http
      .get(ipaddress.value + '/get', {params: params})
      .pipe(
        map((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key]});
            }
          }

          return postArray;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          return throwError(error.message || 'server error');
        })
      )
      .subscribe((posts) => {
        this.dates = posts;
      });
  }

  getItems(value: ImodelDate) {
    const params = new HttpParams().append('id', value.id.toString());

    this.http
      .get(ipaddress.value + '/get1', {params: params})
      .pipe(
        map((responseData) => {
          const postArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({...responseData[key]});
            }
          }
          return postArray;
        })
      )
      .subscribe((posts) => {
        this.items = posts;
      });
  }

  getDateValue() {
    return this.dates;
  }

  getItemsDone() {
    return this.items.filter((item) => !item.done);
  }

  getItemsUndone() {
    return this.items.filter((item) => item.done);
  }

  addItem(event: ImodelWork) {
    this.http
      .post(ipaddress.value + '/post1', event)
      .subscribe((responseData) => {
        this.getItems(event.datee);
      });
  }

  updateItem(event: ImodelWork) {
    console.log(event);
    this.http
      .put(ipaddress.value + '/update', event)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  getWorks(id: number) {
    return this.dates[id];
  }

  deleteDate(id: number) {
    const params = new HttpParams().append('id', id.toString());

    this.http
      .delete(ipaddress.value + '/delete', {params: params})
      .subscribe((responseData) => {
        this.getDates();
      });
  }

  deleteWork(value: ImodelWork, value1: ImodelDate) {
    const params = new HttpParams().append('id', value.id.toString());

    this.http
      .delete(ipaddress.value + '/deletework', {params: params})
      .subscribe((responseData) => {
        this.getItems(value1);
      });
  }

  updateName(event: any) {
    this.http
      .put(ipaddress.value + '/updateName', event)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  updateDateName(event: ImodelWork, valuePreDate: ImodelDate) {
    this.http
      .put(ipaddress.value + '/updateDateName', event)
      .subscribe((responseData) => {
        this.getItems(valuePreDate);
      });
  }

  signUp(value: AuthRequestData) {
    ModelServiceService.requestConditionforInterceptor = false;
    return this.http.post(ipaddress.value + '/signup', value);
  }

  updatePassword(value: AuthRequestData) {
    return this.http.post(ipaddress.value + '/updatePassword', value);
  }

  getIstatisticValue() {
    return this.IstatisticArray;
  }

  getIstatistic() {
    ModelServiceService.requestConditionforInterceptor = false;
    return this.http.get(ipaddress.value + '/getIstatistic').pipe(
      map((responseData) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({...responseData[key]});
          }
        }

        return postArray;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError(error.message || 'server error');
      })
    );
  }
}
