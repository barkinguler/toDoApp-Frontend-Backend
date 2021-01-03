import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      condition=>{
        this.isAuthenticated=condition;

      }
    );
  }
  onLogout(){
    this.authService.user.next(false);
    this.router.navigate(['/login']);
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
  }

}
