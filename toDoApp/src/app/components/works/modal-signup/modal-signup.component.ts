import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImodelResponse } from 'src/app/Imodel/Iresponse';
import { ModalServiceService } from 'src/app/Service/modal-service.service';
import { ModelServiceService } from 'src/app/Service/model-service.service';

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css'],
  providers: [ModalServiceService]
})
export class ModalSignupComponent implements OnInit {

  @ViewChild('modal')elementRef :ElementRef
  @Input() isAuthenticated:boolean;
  error :string=null;
  text:string;
  password:string;
  context:any;
  successStatus:boolean=false;
  constructor(public modalService:  ModalServiceService,public modelService:ModelServiceService) { }
  ngAfterViewInit(): void {
    
    this.modalService.setup({context:this.context,elementReferance:this.elementRef})
  }
  
  open(){
    this.error=null;
    this.successStatus=false;
    this.modalService.open();
  }
  close(){
    this.modalService.close();
  }
  ngOnInit(): void {
    
   this.context=this;
  }
  /*sign(){
  this.modelService.signUp({username:this.text,password:this.password}).subscribe(
    error=>{
      
    }
    
  )
  
  }*/
  sign(form: NgForm){
    
    const username = form.value.username;
    const password = form.value.password;
    this.modelService.signUp({username:username,password:password})
    .subscribe(
      resData => {
        this.successStatus=true;
        this.error=null;
        
      },
      errorMessage => {
        this.successStatus=false;
        this.error=errorMessage;
        
      }
    );

    form.reset();
  }

}
