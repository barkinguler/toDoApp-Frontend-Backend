import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { ImodelResponse } from 'src/app/Imodel/Iresponse';
import { AuthService } from 'src/app/Service/auth.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  error: string = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    let authObs: Observable<ImodelResponse>;
    const username = form.value.username;
    const password = form.value.password;
    authObs = this.authService.logIn({
      username: username,
      password: password,
    });
    authObs.subscribe(
      (resData) => {
        console.log(resData);

        this.router.navigate(['/works']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );

    form.reset();
  }
}
